import { useQuery } from 'react-query';
import getCandleStick from 'services/api/getCandleStick';

const useCandleStick = () => {
  const result = useQuery(['candlestick'], getCandleStick);
  return result;
};

export default useCandleStick;
