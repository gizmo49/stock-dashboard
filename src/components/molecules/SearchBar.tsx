import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface SearchBarProps {
    onSearch: (symbol: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [symbol, setSymbol] = useState<string>('');

    const handleSearch = () => {
        if (symbol) {
            onSearch(symbol.toUpperCase());
            setSymbol('');
        }
    };

    return (
        <div className="search-bar flex justify-center mb-4">
            <Input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Enter stock symbol" />
            <Button onClick={handleSearch} label="Search" />
        </div>
    );
};

export default SearchBar;
