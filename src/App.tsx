import { HashRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CandleStickChart from './pages/CandleStick';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/candleStickChart" element={<CandleStickChart />} />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
