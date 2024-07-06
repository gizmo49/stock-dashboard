import React from 'react';
import IntradayChart from './IntradayChart';
import Stocks from './Stocks';
import SectorPerformance from './SectorPerformance';


const Dashboard: React.FC = () => {

    return (
        <div className="dashboard">
            <Stocks />
            <h2 className="text-2xl font-bold mt-10 mb-4">Intraday Stock Data</h2>
            <IntradayChart symbol="AAPL" />
            <h2 className="text-2xl font-bold mt-10 mb-4">Global Market Overview</h2>
            <SectorPerformance />
        </div>
    );
};

export default Dashboard;
