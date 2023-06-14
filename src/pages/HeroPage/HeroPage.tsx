import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetDetailedHeroQuery } from 'store/modalAPI';
import Form from './components/Form/Form';
import DefaultImg from '../../assets/images/poster.jpg';
import ImageCard from './components/ImageCard/ImageCard';

const HeroPage: React.FC = () => {
  const [url] = useSearchParams();
  const [heroId, setHeroId] = useState<string>('');
  const [images, setImages] = useState<Array<string>>([]);
  const [activeImage, setActiveImage] = useState<string>(DefaultImg);

  useEffect(() => {
    const id = url.get('edit');
    if (id) {
      setHeroId(id);
    }
  }, [url]);

  const { data, isLoading, isError } = useGetDetailedHeroQuery(heroId);
  const hero = data;

  useEffect(() => {
    if (hero && hero.images && hero.images.length) {
      setImages(hero.images);
      setActiveImage(hero.images[0]);
    }
  }, [hero]);

  if (!url || !heroId || isError) {
    return (
      <div className="hero-page__form-wrapper">
        <Form />
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="hero-page__wrapper">
          <div className="hero-page__gallery">
            <div className="hero-page__wrapper-image">
              {activeImage && (
                <img src={activeImage} className="hero-page__image" />
              )}
            </div>

            <div className="hero-page__images-list">
              {images.map((image, index) => (
                <ImageCard
                  image={image}
                  index={index}
                  setActiveImage={() => setActiveImage(image)}
                  key={index}
                />
              ))}
            </div>
          </div>
          <Form />
        </div>
      )}
    </>
  );
};

export default HeroPage;
