import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import HeroCardList, { IHeroCardList } from './HeroCardList';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import store from 'store';
import { IHero } from 'store/heroSlice';

describe('HeroCardList', () => {
  const heroes: IHero[] = [
    {
      _id: '64888d84ba63be03735b680f',
      nickname: 'Batman',
      real_name: 'Bruce Wayne',
      origin_description:
        'After witnessing the murder of his parents as a child, Bruce Wayne vowed to rid Gotham City of crime.',
      superpowers:
        'Genius-level intellect, peak physical and mental conditioning, detective skills, martial arts mastery, advanced technology gadgets',
      catch_phrase: "I'm Batman!",
      images: [
        'https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg',
        'https://www.dccomics.com/sites/default/files/imce/2016/09-SEP/BM_Cv12_57d5ce41d7d030.95178404.jpg',
      ],
    },
    {
      _id: '64888d84ba63be03735b6810',
      nickname: 'Wonder Woman',
      real_name: 'Diana Prince',
      origin_description:
        'Diana, princess of the Amazons, was raised on the hidden island of Themyscira and trained to be an unconquerable warrior.',
      superpowers:
        'Superhuman strength, speed, and agility, enhanced senses, flight, lasso of truth, indestructible bracelets, divine wisdom',
      catch_phrase: 'In a world of ordinary mortals, I am Wonder Woman!',
      images: [
        'https://upload.wikimedia.org/wikipedia/en/8/8d/Wonder_Woman_%282017_film%29.jpg',
        'https://static0.srcdn.com/wordpress/wp-content/uploads/2020/12/wonder-woman-1984-main-art.jpg',
      ],
    },
  ];

  const setup = (props: IHeroCardList) => {
    return render(
      <Provider store={store}>
        <HeroCardList {...props} />
      </Provider>
    );
  };

  it('should render a list of hero cards', () => {
    const { getByText } = setup({ heroes });

    heroes.forEach((hero, index) => {
      expect(getByText(hero.nickname)).toBeInTheDocument();
      const cardImgs = screen.getAllByTestId('card-img');
      expect(cardImgs[index]).toHaveAttribute('src', hero.images[0]);
    });
  });

  it('should show a notification message if there are no heroes', () => {
    const { getByText } = setup({ heroes: [] });

    expect(getByText('Sorry, there are no heroes found')).toBeInTheDocument();
  });

  it('should show the loader on opening the modal', async () => {
    const { getAllByRole } = setup({ heroes });
    const heroCards = getAllByRole('listitem');
    act(() => {
      fireEvent.click(heroCards[0]);
    });

    await waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });
});
