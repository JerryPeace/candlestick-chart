import { useCallback, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Box } from '@mui/material';
import ToolBar from 'components/ToolBar';
import Loading from 'components/Loading';
import useCandleStick from 'hooks/useCandleStick';
import { TCandleStick } from 'services/api/getCandleStick';

const chartOptions: ApexOptions = {
  chart: {
    type: 'candlestick',
    toolbar: {
      show: false,
    },
    height: 350,
  },
  title: {
    text: 'Candlestick Chart',
    align: 'left',
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
};

const CandlestickChart = (): JSX.Element => {
  const { isLoading, data } = useCandleStick();
  const [chartData, setChartData] = useState<TCandleStick[]>([]);
  const [candlesCount, setCandlesCount] = useState(500);

  const loadMoreCandles = useCallback(() => {
    const newCandlesCount = candlesCount + 100;
    data && setChartData(data.slice(0, newCandlesCount));
    setCandlesCount(newCandlesCount);
  }, [candlesCount, data, setChartData]);

  const reduceCandles = useCallback(() => {
    const newCandlesCount = Math.max(candlesCount - 100, 100);
    data && setChartData(data.slice(0, newCandlesCount));
    setCandlesCount(newCandlesCount);
  }, [candlesCount, data, setChartData]);

  useEffect(() => {
    data && setChartData(data.slice(0, 500));
  }, [data, setChartData]);

  return (
    <Box display="flex" height={'100vh'}>
      <ToolBar moreViewOnClick={loadMoreCandles} lessViewOnClick={reduceCandles} />
      {isLoading ? (
        <Loading />
      ) : (
        <Box height={'100%'} width={'100%'}>
          <Chart
            options={chartOptions}
            series={[{ data: chartData }]}
            type="candlestick"
            height={350}
          />
        </Box>
      )}
    </Box>
  );
};

export default CandlestickChart;
