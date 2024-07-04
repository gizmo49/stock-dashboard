import React from 'react';
import Dashboard from './components/organisms/Dashboard';

const App: React.FC = () => {
    return (
        <div className="app min-h-screen bg-gray-100 p-4">
            <h1 className="app__title text-4xl font-bold text-center mb-8">Stock Dashboard</h1>
            <Dashboard />
        </div>
    );
};

export default App;
