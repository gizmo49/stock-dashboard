import React, { useEffect, useState } from 'react';
import StockCard from '../molecules/StockCard';
import SearchBar from '../molecules/SearchBar';

const API_KEY = 'RIBXT3XYLI69PC0Q';

interface Stock {
    symbol: string;
    price: string;
    date: string;
}

const Dashboard: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchStock = async (symbol: string) => {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
            const data = await response.json();
            const timeSeries = data['Time Series (Daily)'];
            const latestDate = Object.keys(timeSeries)[0];
            const stock = {
                symbol: symbol,
                price: timeSeries[latestDate]['4. close'],
                date: latestDate
            };
            setStocks((prevStocks) => [stock, ...prevStocks]);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

    const handleSearch = (symbol: string) => {
        setLoading(true);
        fetchStock(symbol).finally(() => setLoading(false));
    };

    useEffect(() => {
        const symbols = ['IBM', 'AAPL', 'GOOGL', 'MSFT'];
        symbols.forEach((symbol) => fetchStock(symbol));
    }, []);

    return (
        <div className="dashboard">
            <SearchBar onSearch={handleSearch} />
            {loading && <div className="dashboard__loading text-center mt-4">Loading...</div>}
            <div className="dashboard__grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {stocks.map((stock, index) => (
                    <StockCard key={index} symbol={stock.symbol} price={stock.price} date={stock.date} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
