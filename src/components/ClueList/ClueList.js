import React from 'react';

import Clue from '../Clue/Clue';

import classes from './ClueList.module.css';

const ClueList = (props) => {
  const clues = [];
  const clueList = props.clues.split('\n');
  for (let i = 0; i < clueList.length; i++) {
    const clueSplit = clueList[i].split('|');
    const clueObj = {
      number: parseInt(clueSplit[0], 10),
      text: clueSplit[1]
    }

    if (clueObj.number && clueObj.text) {
      clues.push(clueObj);
    }
  }

  const classList = [classes.ClueList, classes[props.direction]].join(' ');

  return (
    <div className={classList}>
      <h3>{props.direction}</h3>
      <ul>
        {clues.map(clue => {
          return <Clue key={clue.text} number={clue.number} text={clue.text}  />
        })}
      </ul>
    </div>
  )
};

export default ClueList;