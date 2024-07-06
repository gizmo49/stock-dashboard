// src/components/organisms/IntradayChart.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { getRequest, cancelRequest } from '../../services/lib/api';

import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
} from 'chart.js';
import { ErrorResponse } from '../../services/lib/interfaces';
import { intraDemoData } from '../../services/lib/data';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

interface IntradayChartProps {
    symbol: string;
}

const IntradayChart: React.FC<IntradayChartProps> = ({ symbol }) => {
    const [chartData, setChartData] = useState<any>(null);
    const [isDemoData, setIsDemoData] = useState<boolean>(false);


    useEffect(() => {
        const fetchIntradayData = async () => {
            try {
                let data: any | ErrorResponse = await getRequest('query', {
                    function: 'TIME_SERIES_INTRADAY',
                    symbol: symbol,
                    interval: '5min',
                }, `intraday-${symbol}`);


                if ('Note' in data || 'Information' in data) {
                    const hasDemoData = Boolean(data.Note || data.Information);
                    setIsDemoData(hasDemoData);
                    data = hasDemoData ? intraDemoData : data;; 
                }

                const timeSeries = data['Time Series (5min)'];
                const labels = Object.keys(timeSeries).reverse();
                const prices = labels.map((label) => timeSeries[label]['4. close']);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Price',
                            data: prices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching intraday data:', error);
            }
        };

        fetchIntradayData();

        return () => {
            // Cancel the request on component unmount
            cancelRequest(`intraday-${symbol}`);
        };
    }, [symbol]);

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time' as const,
                time: {
                    unit: 'minute' as const,
                    tooltipFormat: 'PPpp',
                    displayFormats: {
                        minute: 'HH:mm',
                        hour: 'HH:mm',
                    },
                },
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price',
                },
            },
        },
    };

    return (
        <div className="intraday-chart bg-white shadow-md rounded-lg p-4 m-2">
            {isDemoData && <i>Using Demo data</i>}
            {chartData ? <Line data={chartData} options={options} /> : 'Loading...'}
        </div>
    );
};

export default IntradayChart;
