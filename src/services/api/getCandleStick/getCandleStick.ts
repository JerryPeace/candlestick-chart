import axios from 'axios';
import { TCandleStick, TResponse } from './types';
/**
 * Get response actions
 * @returns {Promise}
 * @throws {Error}
 */

const apiKey = 'demo'; // replace with your API key
const symbol = 'IBM'; // replace with the stock symbol
const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;

export default async function getCandleStick(): Promise<TCandleStick[]> {
  let response: TResponse = {};
  try {
    response = await axios.get(apiUrl);
  } catch (error) {
    throw new Error('Unable to fetch data');
  }
  return normalizedChartData(response) || [];
}

const normalizedChartData = (data: TResponse): TCandleStick[] => {
  const timeSeries = data.data['Time Series (Daily)'];
  return Object.keys(timeSeries).map((timestamp) => {
    const item = timeSeries[timestamp];
    return {
      x: new Date(timestamp),
      y: [
        parseFloat(item['1. open']),
        parseFloat(item['2. high']),
        parseFloat(item['3. low']),
        parseFloat(item['4. close']),
      ],
    };
  });
};
