import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import ProductListItemAttributes from './ProductListItemAttributes';

describe('ProductListItemAttributes', () => {

  const mockAttributes = [
    {
      id: 1,
      name: "Color",
      options: ["Test1"]
    },
  ];

  it('render a color attribute', () => {
    render(<ProductListItemAttributes attributes={mockAttributes} />);
    expect(screen.getByText('Color')).toBeInTheDocument();
  });

});
