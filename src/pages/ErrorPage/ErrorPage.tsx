import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="main__error error" id="error-page">
      <div className="error__content">
        <h2 className="error__title" data-text="404">
          404
        </h2>
        <h4 className="error__subtitle" data-text="Opps! Page is not found">
          Oops! Page is not found
        </h4>
        <p className="error__text">
          Sorry, the page you&#39;re looking for doesn&#39;t exist.
        </p>
        <div className="error__btns">
          <Link to="/">Return home</Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
