export interface TimeSeriesData {
    [key: string]: {
        '1. open': string;
        '2. high': string;
        '3. low': string;
        '4. close': string;
        '5. volume': string;
    };
}

export interface IntradayDataResponse {
    'Meta Data': {
        '1. Information': string;
        '2. Symbol': string;
        '3. Last Refreshed': string;
        '4. Interval': string;
        '5. Output Size': string;
        '6. Time Zone': string;
    };
    'Time Series (5min)': TimeSeriesData;
}

export interface AlphaVantageResponse {
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

export interface SectorAlphaVantageResponse {
    'Meta Data': {
        '1. Information': string;
        '2. Symbol': string;
        '3. Last Refreshed': string;
        '4. Output Size': string;
        '5. Time Zone': string;
    };
    'Rank A: Real-Time Performance': {
        [sector: string]: string; // Each sector key should have a percentage value
    };
}


export interface ErrorResponse {
    Note?: string;
    Information?: string;
}

export interface DemoData {
    [key: string]: any;
}

export interface Stock {
    symbol: string;
    price: string;
    date: string;
}

export interface SectorPerformanceData {
    [key: string]: {
        'Rank A: Real-Time Performance': string;
        'Rank B: 1 Day Performance': string;
        'Rank C: 5 Day Performance': string;
        'Rank D: 1 Month Performance': string;
        'Rank E: 3 Month Performance': string;
        'Rank F: Year-to-Date (YTD) Performance': string;
        'Rank G: 1 Year Performance': string;
        'Rank H: 3 Year Performance': string;
        'Rank I: 5 Year Performance': string;
        'Rank J: 10 Year Performance': string;
    };
}

export interface SMAData {
    'Meta Data': {
        '1: Symbol': string;
        '2: Indicator': string;
        '3: Last Refreshed': string;
        '4: Interval': string;
        '5: Time Period': string;
        '6: Series Type': string;
        '7: Time Zone': string;
    };
    'Technical Analysis: SMA': {
        [key: string]: {
            'SMA': string;
        };
    };
}

export interface CryptoData {
    'Meta Data': {
        '1. Information': string;
        '2. Digital Currency Code': string;
        '3. Digital Currency Name': string;
        '4. Market Code': string;
        '5. Market Name': string;
        '6. Last Refreshed': string;
        '7. Time Zone': string;
    };
    'Time Series (Digital Currency Intraday)': {
        [key: string]: {
            '1a. price (USD)': string;
            '1b. price (USD)': string;
            '2. volume': string;
            '3. market cap (USD)': string;
        };
    };
}


export interface CurrencyData {
    'Realtime Currency Exchange Rate': {
        '1. From_Currency Code': string;
        '2. From_Currency Name': string;
        '3. To_Currency Code': string;
        '4. To_Currency Name': string;
        '5. Exchange Rate': string;
        '6. Last Refreshed': string;
        '7. Time Zone': string;
        '8. Bid Price': string;
        '9. Ask Price': string;
    };
}
