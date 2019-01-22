import React from 'react';

const clue = (props) => (
  <li>
    {`${props.number}. ${props.text}`}
  </li>
);

export default clue;