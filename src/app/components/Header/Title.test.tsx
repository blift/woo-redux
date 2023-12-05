import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title', () => {

  it('render a title', () => {
    render(<Title title="Test1" />);
    expect(screen.getByText('Test1')).toBeInTheDocument();
  });

});