import React from 'react';

interface StockCardProps {
  symbol: string;
  price: string;
  date: string;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, price, date }) => {
  return (
    <div data-testid="stock-card"  className="stock-card bg-white shadow-md rounded-lg p-4 m-2">
      <h2 className="stock-card__symbol text-2xl font-bold">{symbol}</h2>
      <p className="stock-card__price text-xl">${price}</p>
      <p className="stock-card__date text-gray-600">{date}</p>
    </div>
  );
};

export default StockCard;
