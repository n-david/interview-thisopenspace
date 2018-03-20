import React from 'react';
import dots from './dots.gif'

const Loading = () => (
  <div>
    <img
      style={{
        opacity: '.8',
        margin: '15vw',
        width: '90px',
      }}
      src={dots}
      alt="loading"
    />
  </div>
);

export default Loading;
