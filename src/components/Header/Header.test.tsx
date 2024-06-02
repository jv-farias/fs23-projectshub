import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Header } from './Header';
import { SessionProvider } from 'next-auth/react';


function setup(component: JSX.Element) {
  return render(<SessionProvider>
    {component}
  </SessionProvider>);

}
test('renders Header', () => {
  const { getByText } = setup(<Header />);
  const element = getByText(/DC TEAM 23/i);
  expect(element).toBeInTheDocument();
});