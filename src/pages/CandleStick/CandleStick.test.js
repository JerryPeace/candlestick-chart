import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CandlestickChart from './index';
import useCandleStick from 'hooks/useCandleStick';

const mockUseCandleStick = useCandleStick;
jest.mock('hooks/useCandleStick');

class ResizeObserver {
  observe() {}
  unobserve() {}
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('CandlestickChart', () => {
  window.ResizeObserver = ResizeObserver;
  it('should render a loading component while data is being fetched', async () => {
    mockUseCandleStick.mockImplementation(() => ({ isLoading: true }));
    render(<CandlestickChart />, { wrapper });
    const loadingElement = screen.getByTestId('circle-loading');
    expect(loadingElement).toBeInTheDocument();
    await waitFor(() => {
      const chartElement = screen.queryByRole('img', { name: /chart/i });
      expect(chartElement).not.toBeInTheDocument();
    });
  });
});
