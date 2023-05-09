import { render, screen, fireEvent } from '@testing-library/react';
import ToolBar from './ToolBar';

describe('ToolBar', () => {
  const mockMoreViewOnClick = jest.fn();
  const mockLessViewOnClick = jest.fn();

  beforeEach(() => {
    mockMoreViewOnClick.mockClear();
    mockLessViewOnClick.mockClear();
  });

  it('should render two buttons', () => {
    render(<ToolBar moreViewOnClick={mockMoreViewOnClick} lessViewOnClick={mockLessViewOnClick} />);
    const addButton = screen.getByTestId('AddCircleIcon');
    const removeButton = screen.getByTestId('RemoveCircleIcon');
    expect(addButton).toBeInTheDocument();
    expect(removeButton).toBeInTheDocument();
  });

  it('should call the moreViewOnClick callback when the AddCircle button is clicked', () => {
    render(<ToolBar moreViewOnClick={mockMoreViewOnClick} lessViewOnClick={mockLessViewOnClick} />);
    const addButton = screen.getByTestId('AddCircleIcon');
    fireEvent.click(addButton);
    expect(mockMoreViewOnClick).toHaveBeenCalledTimes(1);
  });

  it('should call the lessViewOnClick callback when the RemoveCircle button is clicked', () => {
    render(<ToolBar moreViewOnClick={mockMoreViewOnClick} lessViewOnClick={mockLessViewOnClick} />);
    const removeButton = screen.getByTestId('RemoveCircleIcon');
    fireEvent.click(removeButton);
    expect(mockLessViewOnClick).toHaveBeenCalledTimes(1);
  });
});
