import { normalizedChartData } from './getCandleStick';

describe('normalizedChartData', () => {
  const data = {
    data: {
      'Meta Data': {
        '1. Information': 'Intraday (5min) open, high, low, close prices and volume',
        '2. Symbol': 'IBM',
        '3. Last Refreshed': '2023-05-08 20:00:00',
        '4. Interval': '5min',
        '5. Output Size': 'Full size',
        '6. Time Zone': 'US/Eastern',
      },
      'Time Series (Daily)': {
        '2023-05-08 20:00:00': {
          '1. open': '123.4300',
          '2. high': '125.4300',
          '3. low': '120.4300',
          '4. close': '118.0000',
          '5. volume': '155',
        },
        '2023-05-08 19:40:00': {
          '1. open': '123.4000',
          '2. high': '123.4000',
          '3. low': '123.4000',
          '4. close': '123.4000',
          '5. volume': '207',
        },
        '2023-05-08 19:30:00': {
          '1. open': '123.5000',
          '2. high': '123.5000',
          '3. low': '123.5000',
          '4. close': '123.5000',
          '5. volume': '300',
        },
      },
    },
  };

  const expectedOutput = [
    {
      x: new Date('2023-05-08T20:00:00'),
      y: [123.43, 125.43, 120.43, 118],
    },
    {
      x: new Date('2023-05-08T19:40:00'),
      y: [123.4, 123.4, 123.4, 123.4],
    },
    {
      x: new Date('2023-05-08T19:30:00'),
      y: [123.5, 123.5, 123.5, 123.5],
    },
  ];

  it('should return the expected normalized chart data', () => {
    const actualOutput = normalizedChartData(data);
    expect(actualOutput).toEqual(expectedOutput);
  });
});
