import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import HomePage from './HomePage';
import { Provider } from 'react-redux';
import store from 'store';

describe('Home', () => {
  it('should render the component correctly', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <HomePage />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText('Sorry, there are no heroes found')
      ).toBeInTheDocument();
    });
  });
});
