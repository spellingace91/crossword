import React, { Component } from 'react';

import config from './sample.json';

import classes from './App.module.css';
import CrosswordGrid from './containers/CrosswordGrid/CrosswordGrid';
import ClueList from './components/ClueList/ClueList';

class App extends Component {
  
  render() {
    console.log(config);
    
    return (
      <div className={classes.App}>
        <div className={classes.PuzzleInfo}>
          <h1>{config.Title}</h1>
          <h5>{config.Author}</h5>
        </div>
        <CrosswordGrid
          solution={config.Solution}
          width={config.Width}
          height={config.Height}/>
        <ClueList direction="Across" clues={config.AcrossClue} />
        <ClueList direction="Down" clues={config.DownClue} />
      </div>
    );
  }
}

export default App;
