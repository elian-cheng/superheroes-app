import React, { useState } from 'react';
import { IHero } from 'store/heroSlice';

import HeroCard from '../HeroCard/HeroCard';
import HeroModal from '../HeroModal/HeroModal';

export interface IHeroCardList {
  heroes: IHero[];
}

const HeroCardList: React.FC<IHeroCardList> = ({ heroes }) => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [cardId, setCardId] = useState('');

  const handleOpenModalCard = (e: React.MouseEvent<HTMLUListElement>) => {
    if (e.target instanceof HTMLElement) {
      const heroCard: HTMLElement | null = e.target.closest('.hero__card');
      if (heroCard && heroCard.dataset.id) {
        setModalIsShown(true);
        setCardId(heroCard.dataset.id);
      }
    }
  };

  return (
    <>
      {modalIsShown && (
        <HeroModal cardId={cardId} handleModal={() => setModalIsShown(false)} />
      )}
      {heroes.length ? (
        <ul
          className="hero__list grid"
          onClick={handleOpenModalCard}
          data-testid="hero-list"
        >
          {heroes.map((hero: IHero) => (
            <HeroCard key={hero._id} cardId={hero._id || ''} {...hero} />
          ))}
        </ul>
      ) : (
        <p className="notification-message">Sorry, there are no heroes found</p>
      )}
    </>
  );
};

export default HeroCardList;
