import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react';
import MiniCart from './MiniCart';


test('on click, render a mini cart', () => {

  const mockSetIsOverlay = jest.fn();
  const mockIsOverlay = false;

  render(<MiniCart setIsOverlay={mockSetIsOverlay} isOverlay={mockIsOverlay} />);

  const button = screen.getByRole('button');

  act(() => {
    button.click();
  });
});