import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroPage from './HeroPage';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';

describe('Hero Page', () => {
  it('should render the component correctly', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <Router>
            <HeroPage />
          </Router>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Create/i)).toBeInTheDocument();
      expect(screen.getByText(/Nickname:/i)).toBeInTheDocument();
      expect(document.querySelector('form')).toBeInTheDocument();
    });
  });
});
