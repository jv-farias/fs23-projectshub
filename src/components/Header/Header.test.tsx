import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Header } from './Header';

test('renders Header', () => {
  const { getByText } = render(<Header />);
  const element = getByText(/Header/i);
  expect(element).toBeInTheDocument();
});