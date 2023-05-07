import RatingProvider from 'providers/RatingProvider';
import { HashRouter, Route, Routes } from 'react-router-dom';
import StockChart from './pages/Stock';

const App = () => {
  return (
    <>
      <RatingProvider>
          <HashRouter>
            <Routes>
              <Route path="/stock" element={<StockChart />} />
            </Routes>
          </HashRouter>
      </RatingProvider>
    </>
  );
};

export default App;
