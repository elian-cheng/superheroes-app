import React, { MouseEventHandler, useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import DefaultImg from '../../../../assets/images/poster.jpg';
import Modal from 'components/Modal/Modal';
import { useGetDetailedHeroQuery } from 'store/chosenHeroAPI';
import { Link } from 'react-router-dom';

type ModalCardProps = {
  cardId: string;
  handleModal: MouseEventHandler<HTMLElement>;
};

const HeroModal = ({ cardId, handleModal }: ModalCardProps) => {
  const { data: hero, isLoading, isError } = useGetDetailedHeroQuery(cardId);
  const [images, setImages] = useState<Array<string>>([]);
  const [activeImage, setActiveImage] = useState<string>(DefaultImg);

  useEffect(() => {
    if (cardId && hero && hero.images && hero.images.length) {
      setImages(hero.images);
      setActiveImage(hero.images[0]);
    }
  }, [cardId, hero]);

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
        <div className="hero-modal__actions">
          <div className="hero-modal__image">
            {activeImage && (
              <img
                data-testid="hero-modal-poster"
                src={activeImage}
                alt={hero.nickname}
              />
            )}
          </div>
          <div className="hero-modal__gallery">
            {images
              .filter((image) => image !== activeImage)
              .map((image) => (
                <div
                  className="hero-modal__image-wrapper"
                  onClick={() => setActiveImage(image)}
                  key={image}
                >
                  <img src={image} className="hero-modal__gallery-image" />
                </div>
              ))}
          </div>
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
          <Link className="button-link" to={`/hero?edit=${cardId}`}>
            Edit
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default HeroModal;
