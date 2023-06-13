import React, { FC } from 'react';
import LoaderImg from '../../assets/icons/loader/loader.svg';

const Loader: FC = () => {
  return (
    <div className="loader__wrapper">
      <div className="loader" data-testid="loader">
        <img src={LoaderImg} alt="loader image" />
      </div>
    </div>
  );
};

export default Loader;
