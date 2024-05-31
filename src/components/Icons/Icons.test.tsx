import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Logo, Twitter, GitHub } from './Icons';

test('renders Logo icon', () => {
  render(<Logo />);
  const svgElement = screen.getByRole('img');
  expect(svgElement).toBeInTheDocument();
});

test('renders Twitter icon', () => {
  render(<Twitter />);
  const svgElement = screen.getByRole('img');
  expect(svgElement).toBeInTheDocument();
});

test('renders GitHub icon', () => {
  render(<GitHub />);
  const svgElement = screen.getByRole('img');
  expect(svgElement).toBeInTheDocument();
});
