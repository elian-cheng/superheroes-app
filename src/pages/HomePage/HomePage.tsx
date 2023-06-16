import Loader from 'components/Loader/Loader';
import Pagination from 'components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect, FC, useCallback, useRef } from 'react';
import { getHeroes } from 'store/heroSlice';
import HeroCardList from './components/HeroCardList/HeroCardList';

const HomePage: FC = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { page, heroes, isLoading, isError, limit } = useAppSelector(
    (state) => state.heroes
  );

  const renderHeroes = useCallback(() => {
    dispatch(getHeroes({ page, limit }));
  }, [dispatch, page, limit]);

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
    return isLoading ? (
      <Loader />
    ) : (
      <>
        <HeroCardList heroes={heroes} />
        <Pagination
          topHeight={topRef.current ? topRef.current.offsetTop - 30 : 0}
        />
      </>
    );
  };

  return <>{renderContent()}</>;
};

export default HomePage;
