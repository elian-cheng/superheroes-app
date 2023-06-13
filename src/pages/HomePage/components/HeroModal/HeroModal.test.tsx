import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroModal from './HeroModal';
import { Provider } from 'react-redux';
import store from 'store';

describe('HeroModal', () => {
  it('should have poster image', async () => {
    render(
      <Provider store={store}>
        <HeroModal cardId="64888d84ba63be03735b680e" handleModal={() => {}} />
      </Provider>
    );

    expect(await screen.findByTestId('hero-modal-poster')).toBeVisible();
  });

  it('should render hero data correctly', async () => {
    render(
      <Provider store={store}>
        <HeroModal cardId="64888d84ba63be03735b680e" handleModal={() => {}} />
      </Provider>
    );
    expect(screen.getByTestId('hero-modal')).toBeInTheDocument();
    expect(
      screen.getByText(
        'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight'
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId('hero-modal-origin')).toHaveTextContent(
      "He was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction"
    );
    expect(await screen.findByRole('heading', { level: 3 })).toHaveTextContent(
      'Superman (Clark Kent)'
    );
  });

  it('should render the error message if there is no data or an error', async () => {
    render(
      <Provider store={store}>
        <HeroModal cardId="error" handleModal={() => {}} />
      </Provider>
    );
    expect(
      await screen.findByText(/Something went wrong.../i)
    ).toBeInTheDocument();
  });
});
