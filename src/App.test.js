import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page', () => {
  render(<App />);
  const homeComponent = screen.getByText(/Welcome to Brainstorm/i);
  expect(homeComponent).toBeInTheDocument();
});
