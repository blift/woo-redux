import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ProductListItem from './ProductListItem';

describe('ProductListItem', () => {

  const mockProducts = [
    { 
      id: 1, 
      name: "Test1", 
      description: "Description1", 
      price: '10',
      images: [
        {
          id: 1,
          src: "Test1"
        },
      ],
      attributes: [
        {
          id: 1,
          name: "Test1",
          options: ["Test1"]
        },
      ] 
    },
  ];

  it('render a price', () => {
    render(<ProductListItem product={mockProducts[0]} />);
    expect(screen.getByText('$10')).toBeInTheDocument();
  });

  it('render a name', () => {
    render(<ProductListItem product={mockProducts[0]} />);
    expect(screen.getByText('Test1')).toBeInTheDocument();
  });

  it('render a description', () => {
    render(<ProductListItem product={mockProducts[0]} />);
    expect(screen.getByText('Description1')).toBeInTheDocument();
  });

});