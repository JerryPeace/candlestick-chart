import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ToolBar from 'components/ToolBar';
import Loading from 'components/Loading';
import useCandleStick from 'hooks/useCandleStick';
import Charts from './Charts';
import { IData } from './types';

const dataKey = 'Time Series (Daily)';
const filterDataFunc = (data: IData, count: number) => {
  if (data[dataKey]) {
    const rawData = data[dataKey];
    const entries = Object.entries(rawData);
    const firstEntries = entries.slice(0, count);
    return {
      ...data,
      [dataKey]: Object.fromEntries(firstEntries),
    };
  }
  return data;
};

const CandlestickChart = (): JSX.Element => {
  const { isLoading, data } = useCandleStick();
  const [chartData, setChartData] = useState<IData | undefined>();
  const [candlesCount, setCandlesCount] = useState(500);

  const loadMoreCandles = useCallback(() => {
    const newCandlesCount = candlesCount + 100;
    data && setChartData(filterDataFunc(data, newCandlesCount));
    setCandlesCount(newCandlesCount);
  }, [candlesCount, data, setChartData]);

  const reduceCandles = useCallback(() => {
    const newCandlesCount = Math.max(candlesCount - 100, 100);
    data && setChartData(filterDataFunc(data, newCandlesCount));
    setCandlesCount(newCandlesCount);
  }, [candlesCount, data, setChartData]);

  useEffect(() => {
    data && setChartData(filterDataFunc(data, 500));
  }, [data]);

  return (
    <Box display="flex" height={'100vh'}>
      <ToolBar moreViewOnClick={loadMoreCandles} lessViewOnClick={reduceCandles} />
      {isLoading || !chartData ? (
        <Loading />
      ) : (
        <Box height={'100%'} width={'100%'}>
          <Charts
            padding={10}
            gridScale={5}
            gridColor="#DBDBDB"
            bullColor="#3D92FA"
            bearColor="#FB6C64"
            data={chartData}
          />
        </Box>
      )}
    </Box>
  );
};

export default CandlestickChart;
