  /**
 * Get response actions
 * @returns {Promise}
 * @throws {Error}
 */

  const apiKey = 'demo'; // replace with your API key
  const symbol = 'IBM'; // replace with the stock symbol
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;

export default async function getCandlestick() {
  const res = await fetch(apiUrl);
  return { data: res.json() };
}

