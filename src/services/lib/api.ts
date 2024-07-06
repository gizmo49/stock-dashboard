import axios, { CancelTokenSource } from "axios";

const BASE_URL = `https://www.alphavantage.co/`;
const API_KEY = 'F30X1WJB32CC2C4X';

const API = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
});

// Set default params if they are not already set
API.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params['apikey'] = API_KEY;

    return config;
});

const cancelTokenSources = new Map<string, CancelTokenSource>();

// Utility to create or get a cancel token source
const getCancelTokenSource = (key: string) => {
    if (!cancelTokenSources.has(key)) {
        const source = axios.CancelToken.source();
        cancelTokenSources.set(key, source);
    }
    return cancelTokenSources.get(key)!;
};

// Function to cancel requests
export const cancelRequest = (key: string) => {
    const source = cancelTokenSources.get(key);
    if (source) {
        source.cancel(`Request with key "${key}" was canceled.`);
        cancelTokenSources.delete(key);
    }
};

// Function to make a get request with cancellation support
export const getRequest = async (url: string, params: any = {}, key: string) => {
    const source = getCancelTokenSource(key);
    try {
        const response = await API.get(url, {
            params,
            cancelToken: source.token,
        });
      
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log(error.message);
        } else {
            throw error;
        }
    }
};

export default API;
