import React from 'react';
import { useNavigate } from 'react-router-dom';

import EmptyState from 'components/EmptyState';
import LeftArrow from 'assets/LeftArrow.svg';

import './styles.scss';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <EmptyState text="This route was not found" />

      <button
        type="button"
        className="not-found__button"
        onClick={() => navigate(-1)}
      >
        <img
          src={LeftArrow}
          alt="Left arrow"
        />

        <span>Go back</span>
      </button>
    </div>
  );
};

export default NotFound;
