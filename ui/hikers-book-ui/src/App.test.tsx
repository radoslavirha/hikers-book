import { render } from '@testing-library/react';
import App from './App';

test('Render', () => {
  render(<App />);
  expect(true).toBe(true);
});
