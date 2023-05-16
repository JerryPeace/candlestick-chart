import axios, { AxiosResponse } from 'axios';
import { APISchema } from './types';
import { IData } from 'pages/CandleStick/types';
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
    response = await axios.get(apiUrl);
  } catch (error) {
    throw new Error('Unable to fetch data');
  }
  return response.data && normalizer(response.data);
}

export function normalizer(rawData: APISchema) {
  const metaData = rawData['Meta Data'];
  const timeSeriesData = rawData['Time Series (Daily)'];
  return {
    'Meta Data': {
      Information: metaData['1. Information'],
      Symbol: metaData['2. Symbol'],
      'Last Refreshed': metaData['3. Last Refreshed'],
      'Output Size': metaData['4. Output Size'],
      'Time Zone': metaData['5. Time Zone'],
    },
    'Time Series (Daily)': Object.entries(timeSeriesData).reduce(
      (acc, [date, data]) => ({
        ...acc,
        [date]: {
          open: data['1. open'],
          high: data['2. high'],
          low: data['3. low'],
          close: data['4. close'],
          volume: data['5. volume'],
        },
      }),
      {}
    ),
  };
}
