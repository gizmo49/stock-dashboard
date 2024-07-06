import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { getRequest } from '../../services/lib/api';
import { demoStockData } from '../../services/lib/data';
import Stocks from '../organisms/Stocks';

jest.mock('../../services/lib/api');

const mockedGetRequest = getRequest as jest.MockedFunction<typeof getRequest>;

interface AlphaVantageResponse {
    'Meta Data': {
        '1. Information': string;
        '2. Symbol': string;
        '3. Last Refreshed': string;
        '4. Output Size': string;
        '5. Time Zone': string;
    };
    'Time Series (Daily)': {
        [date: string]: {
            '1. open': string;
            '2. high': string;
            '3. low': string;
            '4. close': string;
            '5. volume': string;
        };
    };
}

describe('Stocks Component', () => {
    beforeEach(() => {
        mockedGetRequest.mockClear();
    });

    it('should render stock cards with demo data when API limit is reached', async () => {
        mockedGetRequest.mockImplementation(async (endpoint, params, key) => {
            return { Note: 'API call frequency is exceeded' };
        });

        await act(async () => {
            render(<Stocks />);
        });

        const noteElement = await screen.findByText('API call frequency is exceeded');
        expect(noteElement).toBeInTheDocument();

        // demoStockData.forEach((demoData, index) => {
        //     const latestDate = Object.keys(demoData['Time Series (Daily)'])[0];
        //     const price = demoData['Time Series (Daily)'][latestDate]['4. close'];

        //     const stockSymbolElement = screen.getByText(demoData['Meta Data']['2. Symbol']);
        //     const stockPriceElement = screen.getByText(price);

        //     expect(stockSymbolElement).toBeInTheDocument();
        //     expect(stockPriceElement).toBeInTheDocument();
        // });
        // Check each demo data item
        demoStockData.forEach((demoData) => {
            const latestDate = Object.keys(demoData['Time Series (Daily)'])[0];
            const price = demoData['Time Series (Daily)'][latestDate]['4. close'];

            // Use regex to match the price with potential whitespace or formatting
            const priceRegex = new RegExp(`\\$\\s*${price}`);
            const stockPriceElement = screen.getByText(priceRegex);

            expect(stockPriceElement).toBeInTheDocument();
        });
    });

    it('should render stock cards with fetched data', async () => {
        // Mock API response to simulate successful data fetch
        mockedGetRequest.mockResolvedValueOnce({
            'Meta Data': {
                '2. Symbol': 'IBM'
            },
            'Time Series (Daily)': {
                '2023-07-03': {
                    '4. close': '130.7500'
                }
            }
        });

        await act(async () => {
            render(<Stocks />);
        });

        // Ensure stock card elements are rendered
        const stockSymbolElement = screen.getByText('IBM');
        expect(stockSymbolElement).toBeInTheDocument();

        // Use regex to match price with potential formatting characters
        const priceRegex = new RegExp(`\\$\\s*130\\.7500`);
        const stockPriceElement = screen.getByText(priceRegex);
        expect(stockPriceElement).toBeInTheDocument();
    });
});
