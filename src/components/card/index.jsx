import React from 'react';

import 'styles.css'

const Card = ({title, description, link, tag}) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <a href="">{link}</a>
      <p>{tag}</p>
    </div>
  )
}

export default Card;