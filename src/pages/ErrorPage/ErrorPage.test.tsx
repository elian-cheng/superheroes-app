import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from 'App';
import { act } from 'react-dom/test-utils';

describe('Error Page', () => {
  it('should render the component correctly', async () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/404']}>
          <App />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('404')).toBeInTheDocument();
      expect(screen.getByText('Oops! Page is not found')).toBeInTheDocument();
      expect(screen.getByText('Return home')).toBeInTheDocument();
      expect(document.querySelector('.error__btns')).toBeInTheDocument();
    });
  });
});
