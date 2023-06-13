import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import HeroCard from './HeroCard';

describe('Movie Card', () => {
  let cardItem: HTMLElement;
  const testCard = {
    nickname: 'Wonder Woman',
    images: [
      'https://upload.wikimedia.org/wikipedia/en/8/8d/Wonder_Woman_%282017_film%29.jpg',
      'https://static0.srcdn.com/wordpress/wp-content/uploads/2020/12/wonder-woman-1984-main-art.jpg',
    ],
    cardId: '64888d84ba63be03735b6810',
  };

  beforeEach(() => {
    act(() => {
      render(<HeroCard {...testCard} />);
    });
  });

  it('should render the component correctly', () => {
    cardItem = screen.getByRole('listitem');
    expect(cardItem).toBeInTheDocument();
  });

  it('should render the card props correctly', () => {
    act(() => {});
    expect(screen.getByTestId('card-img')).toHaveAttribute(
      'src',
      'https://upload.wikimedia.org/wikipedia/en/8/8d/Wonder_Woman_%282017_film%29.jpg'
    );
    expect(screen.getByTestId('card-title').textContent).toBe('Wonder Woman');
  });
});
