import { normalizer } from './getCandleStick';

describe('normalizedChartData', () => {
  const data = {
    'Meta Data': {
      '1. Information': 'Daily Prices (open, high, low, close) and Volumes',
      '2. Symbol': 'IBM',
      '3. Last Refreshed': '2023-05-15',
      '4. Output Size': 'Full size',
      '5. Time Zone': 'US/Eastern',
    },
    'Time Series (Daily)': {
      '2023-05-15': {
        '1. open': '123.0000',
        '2. high': '123.6881',
        '3. low': '122.3400',
        '4. close': '123.3600',
        '5. volume': '2909922',
      },
      '2023-05-12': {
        '1. open': '121.4100',
        '2. high': '122.8600',
        '3. low': '121.1100',
        '4. close': '122.8400',
        '5. volume': '4564825',
      },
      '2023-05-11': {
        '1. open': '122.0200',
        '2. high': '122.2400',
        '3. low': '120.5500',
        '4. close': '120.9000',
        '5. volume': '3446452',
      },
    },
  };

  const expectedOutput = {
    'Meta Data': {
      Information: 'Daily Prices (open, high, low, close) and Volumes',
      Symbol: 'IBM',
      'Last Refreshed': '2023-05-15',
      'Output Size': 'Full size',
      'Time Zone': 'US/Eastern',
    },
    'Time Series (Daily)': {
      '2023-05-15': {
        open: '123.0000',
        high: '123.6881',
        low: '122.3400',
        close: '123.3600',
        volume: '2909922',
      },
      '2023-05-12': {
        open: '121.4100',
        high: '122.8600',
        low: '121.1100',
        close: '122.8400',
        volume: '4564825',
      },
      '2023-05-11': {
        open: '122.0200',
        high: '122.2400',
        low: '120.5500',
        close: '120.9000',
        volume: '3446452',
      },
    },
  };

  it('should return the expected normalized chart data', () => {
    const actualOutput = normalizer(data);
    expect(actualOutput).toEqual(expectedOutput);
  });
});
