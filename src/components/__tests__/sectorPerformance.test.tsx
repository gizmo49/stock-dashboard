import React from 'react';
import { render, screen } from '@testing-library/react';
import { getRequest } from '../../services/lib/api';
import { sectorDemoData } from '../../services/lib/data';
import SectorPerformance from '../organisms/SectorPerformance';

jest.mock('../../services/lib/api');

const mockedGetRequest = getRequest as jest.MockedFunction<typeof getRequest>;

describe('SectorPerformance Component', () => {
    beforeEach(() => {
        mockedGetRequest.mockClear();
    });

    it('should render sector performance chart with demo data', async () => {
        mockedGetRequest.mockImplementation(async (endpoint, params) => {
            return { Note: 'API call frequency is exceeded' };
        });

        render(<SectorPerformance />);

        const chartContainer = await screen.findByTestId('sector-performance-chart');
        expect(chartContainer).toBeInTheDocument();

        const demoDataIndicator = await screen.findByText('Using Demo data');
        expect(demoDataIndicator).toBeInTheDocument();
    });

    it('should render sector performance chart with fetched data', async () => {
        const mockResponse = {
            'Rank A: Real-Time Performance': {
                'Information Technology': '2.56%',
                'Health Care': '1.45%',
                'Financials': '-0.24%',
                'Consumer Discretionary': '0.78%',
                'Communication Services': '1.89%',
                'Industrials': '-1.23%',
                'Consumer Staples': '0.65%',
                'Energy': '1.34%',
                'Utilities': '0.98%',
                'Real Estate': '1.14%',
                'Materials': '0.75%',
            },
        };

        mockedGetRequest.mockImplementation(async (endpoint, params) => {
            return mockResponse;
        });

        render(<SectorPerformance />);

        const chartContainer = await screen.findByTestId('sector-performance-chart');
        expect(chartContainer).toBeInTheDocument();

        const demoDataIndicator = screen.queryByText('Using Demo data');
        expect(demoDataIndicator).not.toBeInTheDocument();
    });
});
