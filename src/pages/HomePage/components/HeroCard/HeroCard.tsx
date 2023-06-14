import React, { useState } from 'react';
import Card from 'components/Card/Card';
import defaultImg from '../../../../assets/images/poster.jpg';

export interface IHeroCard {
  nickname: string;
  images: string[];
  cardId: string;
}

const HeroCard: React.FC<IHeroCard> = ({ nickname, images, cardId }) => {
  const [poster, setPoster] = useState<string>(images[0]);

  const handleImageError = () => {
    setPoster(defaultImg);
  };

  return (
    <Card dataId={cardId} className="hero__card">
      <div className="card__image">
        <img
          src={poster}
          alt={nickname}
          data-testid="card-img"
          onError={handleImageError}
        />
      </div>
      <div className="card__info">
        <h3 className="card__title" data-testid="card-title">
          {nickname}
        </h3>
      </div>
    </Card>
  );
};

export default HeroCard;
