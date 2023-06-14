import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormPage from './HeroPage';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from 'store';

describe('Form Page', () => {
  it('should render the component correctly', () => {
    act(() => {
      render(
        <Provider store={store}>
          <FormPage />
        </Provider>
      );
    });
    expect(screen.getByText(/Your orders:/i)).toBeInTheDocument();
    expect(screen.getByText(/There are no orders yet/i)).toBeInTheDocument();
    expect(document.querySelector('form')).toBeInTheDocument();
  });
});
