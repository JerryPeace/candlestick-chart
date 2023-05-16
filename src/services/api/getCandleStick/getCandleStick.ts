import axios, { AxiosResponse } from 'axios';
import { DailyData, IData, MetaData } from 'pages/CandleStick/types';
import { APISchema } from './types';
/**
 * Get response actions
 * @returns {Promise}
 * @throws {Error}
 */

const apiKey = 'demo'; // replace with your API key
const symbol = 'IBM'; // replace with the stock symbol
const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;

export default async function getCandleStick(): Promise<IData> {
  let response: AxiosResponse;
  try {
    const start = performance.now();
    response = await axios.get(apiUrl);
    const end = performance.now();
    console.log(`API query time: ${end - start} ms`);
    response = await axios.get(apiUrl);
  } catch (error) {
    throw new Error('Unable to fetch data');
  }
  const result = response.data && normalizer(response.data);
  return result;
}

export function normalizer(rawData: APISchema) {
  const start = performance.now();
  const { 'Meta Data': metaData, 'Time Series (Daily)': timeSeriesData } = rawData;
  const data: { 'Meta Data': MetaData; 'Time Series (Daily)': Record<string, DailyData> } = {
    'Meta Data': {
      Information: metaData['1. Information'],
      Symbol: metaData['2. Symbol'],
      'Last Refreshed': metaData['3. Last Refreshed'],
      'Output Size': metaData['4. Output Size'],
      'Time Zone': metaData['5. Time Zone'],
    },
    'Time Series (Daily)': {},
  };

  for (const date in timeSeriesData) {
    data['Time Series (Daily)'][date] = {
      open: timeSeriesData[date]['1. open'],
      high: timeSeriesData[date]['2. high'],
      low: timeSeriesData[date]['3. low'],
      close: timeSeriesData[date]['4. close'],
      volume: timeSeriesData[date]['5. volume'],
    };
  }

  const end = performance.now();
  console.log(`normalizer execute time: ${end - start} ms`);
  return data;
}
