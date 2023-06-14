import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from 'App';
import { Provider } from 'react-redux';
import store from 'store';

describe('Router', () => {
  it('should navigate to HomePage when clicking the logo', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/hero']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });

    act(() => {
      const homeLink = document.querySelector('.header__logo');
      homeLink?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    await waitFor(() => {
      const homePageContent = screen.getByTestId('loader');
      expect(homePageContent).toBeInTheDocument();
    });
  });

  it('should navigate to FormPage from HomePage', () => {
    act(() => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });

    act(() => {
      const heroLink = screen.getByText('Hero');
      heroLink.click();
    });

    const heroPageContent = screen.getByTestId('form');
    expect(heroPageContent).toBeInTheDocument();
  });

  it('should navigate to HomePage from HeroPage', async () => {
    act(() => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/hero']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
    });

    act(() => {
      const homeLink = screen.getByText('Home');
      homeLink.click();
    });

    await waitFor(() => {
      const homePageContent = screen.getByTestId('loader');
      expect(homePageContent).toBeInTheDocument();
    });
  });

  it('should navigate to ErrorPage on the wrong URL', () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/test']}>
          <App />
        </MemoryRouter>
      );
    });

    const errorElement = document.getElementById('error-page');
    const errorNumber = screen.getByText('404');
    const errorText = screen.getByText('Oops! Page is not found');

    expect(errorElement).toBeInTheDocument();
    expect(errorNumber).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
  });
});
