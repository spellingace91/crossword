import React from 'react';

import classes from './Square.module.css';

const square = (props) => {
  const squareClasses = [classes.Square];

  if (props.blank) {
    squareClasses.push(classes.Filled);
  }

  return (
    <div className={squareClasses.join(' ')}>
      <span>{props.numbering}</span>
      <input 
        type="text"
        minLength="1"
        maxLength="1"
        tabIndex={props.tabindex}
        pattern="[a-zA-Z]+"
        onFocus={(event) => props.onFocus(event, props.index)}
        onKeyDown={(event) => props.onKeyDown(event, props.index)}
        onChange = {(event) => props.onChange(event, props.index)}
        index={props.index}
        >
      </input>
    </div>
  )
}

export default square;