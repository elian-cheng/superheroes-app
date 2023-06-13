import React, { MouseEventHandler } from 'react';
import Loader from 'components/Loader/Loader';
import DefaultImg from '../../../../assets/images/poster.jpg';
import Modal from 'components/Modal/Modal';
import { useGetDetailedHeroQuery } from 'store/modalAPI';

type ModalCardProps = {
  cardId: string;
  handleModal: MouseEventHandler<HTMLElement>;
};

const HeroModal = ({ cardId, handleModal }: ModalCardProps) => {
  const { data, isLoading, isError } = useGetDetailedHeroQuery(cardId);
  const hero = data;
  const heroPoster = hero?.images[0] ? hero?.images[0] : DefaultImg;

  if (isLoading) {
    return (
      <Modal handleModal={handleModal}>
        <Loader />
      </Modal>
    );
  }

  if (isError || !hero) {
    return (
      <Modal handleModal={handleModal}>
        <p className="notification-message">
          Something went wrong... Check your internet connection.
        </p>
      </Modal>
    );
  }

  return (
    <Modal handleModal={handleModal}>
      <div className="hero-modal" data-testid="hero-modal">
        <div className="hero-modal__image">
          <img
            data-testid="hero-modal-poster"
            src={heroPoster}
            alt={hero.nickname}
          />
        </div>
        <div className="hero-modal__info">
          <h3 className="hero-modal__title">
            {hero.nickname}{' '}
            <span className="label-text">({hero.real_name})</span>
          </h3>
          <div className="hero-modal__details">
            <p>
              <span className="label-text">Superpowers:</span>
              {hero.superpowers}
            </p>
            <p>
              <span className="label-text">Catch Phrase:</span>
              {hero.catch_phrase}
            </p>
          </div>
          <div className="hero-modal__overview">
            <h2>Origin</h2>
            <p data-testid="hero-modal-origin">{hero.origin_description}</p>
          </div>
          <div className="hero-modal__gallery">
            {hero.images.map((image, index) =>
              image[1] ? (
                <span key={index}>
                  <img src={image} alt={hero.nickname} />
                </span>
              ) : null
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default HeroModal;
