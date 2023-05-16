export interface MetaData {
  Information: string;
  Symbol: string;
  'Last Refreshed': string;
  'Output Size': string;
  'Time Zone': string;
}

export interface DailyData {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface IData {
  'Meta Data': MetaData;
  'Time Series (Daily)': Record<string, DailyData>;
}

export interface CandlesticksProps {
  padding: number;
  gridScale: number;
  gridColor: string;
  bullColor: string;
  bearColor: string;
  data: IData;
}
