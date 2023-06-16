import Loader from 'components/Loader/Loader';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetDetailedHeroQuery } from 'store/chosenHeroAPI';
import Form from './components/Form/Form';
import DefaultImg from '../../assets/images/poster.jpg';
import ImageCard from './components/ImageCard/ImageCard';
import { useAppDispatch } from 'hooks/redux';
import { deleteHero, updateHero } from 'store/heroSlice';
import Button from 'components/Button/Button';

const HeroPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const { data: hero, isLoading, isError } = useGetDetailedHeroQuery(heroId);

  useEffect(() => {
    if (heroId && hero && hero.images && hero.images.length) {
      setImages(hero.images);
      setActiveImage(hero.images[0]);
    }
  }, [heroId, hero]);

  const deleteHeroHandler = useCallback(async () => {
    if (hero) {
      try {
        await dispatch(deleteHero(hero._id!));
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  }, [hero, dispatch, navigate]);

  const deleteImageHandler = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      const currentImage = (e.currentTarget.nextSibling as HTMLImageElement)
        ?.src;
      const filteredImages = images.filter((img) => img !== currentImage);
      setImages(filteredImages);

      if (filteredImages.length > 0) {
        setActiveImage(filteredImages[0]);
      } else {
        setActiveImage(DefaultImg);
      }

      if (hero) {
        try {
          const requestData = {
            nickname: hero.nickname,
            real_name: hero.real_name,
            origin_description: hero.origin_description,
            superpowers: hero.superpowers,
            catch_phrase: hero.catch_phrase,
            images: filteredImages,
          };
          await dispatch(updateHero({ id: hero._id!, heroData: requestData }));
        } catch (err) {
          console.error(err);
        }
      }
    },
    [hero, images, dispatch]
  );

  if (!url || !heroId || isError) {
    return (
      <div className="hero-page__form-wrapper">
        <Form hero={heroId && hero ? hero : null} />
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="hero-page__wrapper">
            <div className="hero-page__gallery">
              <div className="hero-page__wrapper-image">
                {activeImage && (
                  <>
                    <button
                      className="hero-image__close-btn"
                      data-testid="hero-image-close-btn"
                      onClick={deleteImageHandler}
                    >
                      &times;
                    </button>
                    <img src={activeImage} className="hero-page__image" />
                  </>
                )}
              </div>

              <div className="hero-page__images-list">
                {images
                  .filter((image) => image !== activeImage)
                  .map((image) => (
                    <ImageCard
                      image={image}
                      key={image}
                      onDelete={deleteImageHandler}
                    />
                  ))}
              </div>
            </div>
            <Form hero={heroId && hero ? hero : null} changedImages={images} />
          </div>
          <Button className="hero-page__delete-btn" onClick={deleteHeroHandler}>
            Delete Hero
          </Button>
        </>
      )}
    </>
  );
};

export default HeroPage;
