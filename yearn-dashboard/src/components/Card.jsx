import React from 'react';

const Card = ({ title, content }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', margin: '10px' }}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Card;
