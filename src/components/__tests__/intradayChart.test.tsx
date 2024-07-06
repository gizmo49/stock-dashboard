// src/components/organisms/IntradayChart.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { getRequest } from '../../services/lib/api';
import { intraDemoData } from '../../services/lib/data';
import IntradayChart from '../organisms/IntradayChart';

jest.mock('../../services/lib/api');

const mockedGetRequest = getRequest as jest.MockedFunction<typeof getRequest>;

describe('IntradayChart Component', () => {
    beforeEach(() => {
        mockedGetRequest.mockClear();
    });

    it('should render intraday chart with demo data', async () => {
        mockedGetRequest.mockImplementation(async (endpoint, params) => {
            return { Note: 'API call frequency is exceeded' };
        });

        render(<IntradayChart symbol="AAPL" />);

        const chartContainer = await screen.findByTestId('intraday-chart');
        expect(chartContainer).toBeInTheDocument();

        const demoDataIndicator = await screen.findByText('Using Demo data');
        expect(demoDataIndicator).toBeInTheDocument();
    });

    it('should render intraday chart with fetched data', async () => {
        const mockResponse = {
            'Time Series (5min)': {
                '2024-07-06 16:00:00': {
                    '1. open': '150.00',
                    '2. high': '151.00',
                    '3. low': '149.50',
                    '4. close': '150.50',
                    '5. volume': '10000',
                },
                '2024-07-06 15:55:00': {
                    '1. open': '149.00',
                    '2. high': '150.00',
                    '3. low': '148.50',
                    '4. close': '149.50',
                    '5. volume': '20000',
                },
            },
        };

        mockedGetRequest.mockImplementation(async (endpoint, params) => {
            return mockResponse;
        });

        render(<IntradayChart symbol="AAPL" />);

        const chartContainer = await screen.findByTestId('intraday-chart');
        expect(chartContainer).toBeInTheDocument();

        const demoDataIndicator = screen.queryByText('Using Demo data');
        expect(demoDataIndicator).not.toBeInTheDocument();
    });
});
