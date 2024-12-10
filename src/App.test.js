import { render, screen } from '@testing-library/react';

import Appointment from './Appointment';

test('renders learn react link', () => {
  render(<Appointment />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
