import '@testing-library/jest-dom'
import { screen } from '@testing-library/react';
import ProductBuy from './ProductBuy';
import { renderWithProviders } from '../utils/renderWithProviders';

test('Check if ProductBuy renders', () => {

  const mockProps = {
    id: 1,
    name: "Test1",
    price: '10',
    images: [
      {
        id: 1,
        src: "Test1"
      },
    ],
  };

  renderWithProviders(<ProductBuy id={mockProps.id} name={mockProps.name} price={mockProps.price} images={mockProps.images}/>);
 
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();

  // screen.debug();

});