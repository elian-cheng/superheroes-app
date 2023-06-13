import Loader from 'components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect, FC, useCallback } from 'react';
import { getHeroes } from 'store/heroSlice';
import HeroCardList from './components/HeroCardList/HeroCardList';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { heroes, isLoading, isError } = useAppSelector(
    (state) => state.heroes
  );

  const renderHeroes = useCallback(() => {
    dispatch(getHeroes(1));
  }, [dispatch]);

  useEffect(() => {
    renderHeroes();
  }, [renderHeroes]);

  const renderContent = () => {
    if (isError) {
      return (
        <p className="notification-message">
          Something went wrong... Check your internet connection.
        </p>
      );
    }
    return isLoading ? <Loader /> : <HeroCardList heroes={heroes} />;
  };

  return <>{renderContent()}</>;
};

export default HomePage;
