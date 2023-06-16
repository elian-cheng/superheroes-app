import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HeroModal from './HeroModal';
import { Provider } from 'react-redux';
import store from 'store';
import { act } from 'react-dom/test-utils';

describe('HeroModal', () => {
  it('should render the error message if there is no data or an error', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <HeroModal cardId="error" handleModal={() => {}} />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          'Something went wrong... Check your internet connection.'
        )
      ).toBeInTheDocument();
    });
  });
});
