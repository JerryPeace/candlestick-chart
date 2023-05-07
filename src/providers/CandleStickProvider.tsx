import {
  ReactNode,
  useMemo,
  createContext,
  useEffect,
  useState,
  SetStateAction,
  Dispatch
} from 'react';
import api from 'services/api';
import useAPI, { APIStatus, APIFetch } from 'hooks/useAPI';

export type TCandleStick = {
  [key: string]: string
}

export type TCandleStickContext = {
  candleSticks: TCandleStick | null;
  setCandleStick: Dispatch<SetStateAction<TCandleStick | null>>;
  getCandleStickStatus: APIStatus<typeof api.getCandlestick>;
  getCandleStickFetch: APIFetch<typeof api.getCandlestick>;
};

export type TCandleStickProviderProps = {
  children?: ReactNode;
};

export const CandleStickContext = createContext<TCandleStickContext>({
  candleSticks: null,
  setCandleStick: () => {},
  getCandleStickStatus: { isLoading: false, response: null, error: null },
  getCandleStickFetch: async () => {}
});

const CandleStickProvider = ({ children }: TCandleStickProviderProps) => {
  const [candleSticks, setCandleStick] = useState<any>(null);
  const [getCandleStickStatus, getCandleStickFetch] = useAPI(api.getCandlestick);

  const contextValue = useMemo<TCandleStickContext>(
    () => ({ candleSticks, setCandleStick, getCandleStickStatus, getCandleStickFetch }),
    [candleSticks, setCandleStick, getCandleStickStatus, getCandleStickFetch]
  );

  useEffect(() => {
    getCandleStickFetch();
  }, [getCandleStickFetch])

  useEffect(() => {
    if (getCandleStickStatus.response?.data) {
      setCandleStick(getCandleStickStatus.response?.data);
    }
  }, [getCandleStickStatus.response, setCandleStick]);

  return <CandleStickContext.Provider value={contextValue}>{children}</CandleStickContext.Provider>;
};

export default CandleStickProvider;
