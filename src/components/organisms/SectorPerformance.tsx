import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getRequest, cancelRequest } from '../../services/lib/api';
import { ErrorResponse } from '../../services/lib/interfaces';
import { sectorDemoData } from '../../services/lib/data';


const SectorPerformance: React.FC = () => {
    const [chartData, setChartData] = useState<any>(null);
    const [isDemoData, setIsDemoData] = useState<boolean>(false);

    useEffect(() => {
        const fetchSectorPerformance = async () => {
            try {
                let data: any | ErrorResponse = await getRequest('query', {
                    function: 'SECTOR',
                }, 'sector-performance');

                const emptyData = Object.keys(data).length === 0;
                if ('Note' in data || 'Information' in data || emptyData) {
                    const hasDemoData = Boolean(data.Note || data.Information || emptyData);
                    setIsDemoData(hasDemoData);
                    data = hasDemoData ? sectorDemoData : data;;
                }

                const labels = Object.keys(data['Rank A: Real-Time Performance']);
                const values = labels.map((label) => parseFloat(data['Rank A: Real-Time Performance'][label]));

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Performance (%)',
                            data: values,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching sector performance:', error);
            }
        };

        fetchSectorPerformance();

        return () => {
            // Cancel request on component unmount
            cancelRequest('sector-performance');
        };
    }, []);

    return (
        <div className="sector-performance bg-white shadow-md rounded-lg p-4 m-2">
            {isDemoData && <i>Using Demo data</i>}
            {chartData ? <Bar data={chartData} /> : 'Loading...'}
        </div>
    );
};

export default SectorPerformance;
