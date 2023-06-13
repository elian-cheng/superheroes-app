import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import { act } from 'react-dom/test-utils';

describe('Footer', () => {
  beforeEach(() => {
    act(() => {
      render(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      );
    });
  });

  it('should render the component correctly', () => {
    const gitLink = screen.getByText(/olga chernega/i);
    const year = screen.getByText('2023');
    expect(gitLink).toBeInTheDocument();
    expect(year).toBeInTheDocument();
  });

  it('should render links correctly', () => {
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
});
