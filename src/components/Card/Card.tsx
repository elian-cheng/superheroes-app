import React from 'react';

const Card = (props: {
  children: React.ReactNode;
  className?: string;
  dataId?: string;
}) => {
  const cardClass = `${props.className ? props.className + ' card' : 'card'}`;
  const id = `${props.dataId ? props.dataId : ''}`;
  return (
    <li className={cardClass} data-id={id}>
      <div className="card__content">{props.children}</div>
    </li>
  );
};
export default Card;
