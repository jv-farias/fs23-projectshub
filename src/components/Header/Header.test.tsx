import React from 'react';
import { render } from '@testing-library/react';
import { Header } from './Header';
import { SessionProvider } from 'next-auth/react';


function setup(component: JSX.Element) {
  return render(<SessionProvider>
    {component}
  </SessionProvider>);
}

test('renders Header', () => {
  const { getByText } = setup(<Header />);
  const element = getByText(/FS23 - PROJECTS HUB/i);
  
  expect(element).toBeInTheDocument();
});