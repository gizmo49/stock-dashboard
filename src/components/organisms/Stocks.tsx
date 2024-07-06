import React, { useEffect, useState } from 'react';
import StockCard from '../molecules/StockCard';
import { getRequest, cancelRequest } from '../../services/lib/api';
import { Stock, ErrorResponse } from '../../services/lib/interfaces';
import { demoStockData } from '../../services/lib/data';


const Stocks: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [note, setNote] = useState<string | null>(null);

    useEffect(() => {
        const symbols = ['IBM', 'AAPL', 'GOOGL', 'MSFT'];

        const fetchData = async () => {
            const fetchedStocks: Stock[] = [];

            for (let index = 0; index < symbols.length; index++) {
                const symbol = symbols[index];
                try {
                    let data: any | ErrorResponse = await getRequest('query', {
                        function: 'TIME_SERIES_DAILY',
                        symbol: symbol,
                    }, `stock-${symbol}`);

                    if ('Note' in data || 'Information' in data) {
                        setNote(data.Note || data.Information);
                        data = demoStockData[index]; 
                    }

                    const timeSeries = data['Time Series (Daily)'];
                    const latestDate = Object.keys(timeSeries)[0];
                    const stock: Stock = {
                        symbol: symbol,
                        price: timeSeries[latestDate]['4. close'],
                        date: latestDate,
                    };
                    fetchedStocks.push(stock);
                } catch (error) {
                    console.error('Error fetching stock data:', error);
                }
            }

            setStocks(fetchedStocks);
        };

        fetchData();

        return () => {
            // Cancel all stock requests on component unmount
            symbols.forEach((symbol) => cancelRequest(`stock-${symbol}`));
        };
    }, []);

    return (
        <div>
            {note && <p className="text-red-500">{note}</p>}
            <div className="dashboard__grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {stocks.map((stock, index) => (
                    <StockCard key={index} symbol={stock.symbol} price={stock.price} date={stock.date} />
                ))}
            </div>
        </div>
    );
};

export default Stocks;
