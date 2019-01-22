import React from 'react';

import classes from './Square.module.css';

const square = (props) => {
  const squareClasses = [classes.Square];

  console.log(props);

  if (props.blank) {
    squareClasses.push(classes.Filled);
  }

  return (
    <input 
      type="text"
      minLength="1"
      maxLength="1"
      tabIndex={props.tabindex}
      pattern="[a-zA-Z]+"
      className={squareClasses.join(' ')}></input>
  )
}

export default square;