import React, { Component } from 'react';

import config from './sample.json';

import classes from './App.module.css';
import CrosswordGrid from './containers/CrosswordGrid/CrosswordGrid';
import ClueList from './components/ClueList/ClueList';
import Timer from './components/Timer/Timer';

class App extends Component {
  state = {
    isStarted: false,
    isCompleted: false
  }

  onStartTimer() {
    this.setState({isStarted: true});
  }

  onCompleted() {
    this.setState({isCompleted: true});
  }
  
  render() {
    console.log('[App.js] render');
    return (
      <div className={classes.App}>
        <div className={classes.PuzzleInfo}>
          <h1>{config.Title}</h1>
          <h5>{config.Author}</h5>
        </div>
        <div className={classes.PuzzleTools}>
        <Timer 
          hasStarted={this.state.isStarted} 
          isCompleted={this.state.isCompleted}  
        />
        </div>
        <CrosswordGrid
          solution={config.Solution}
          width={config.Width}
          height={config.Height}
          onStartTimer={this.onStartTimer.bind(this)}
          onCompleted={this.onCompleted.bind(this)}/>
        <ClueList direction="Across" clues={config.AcrossClue} />
        <ClueList direction="Down" clues={config.DownClue} />
      </div>
    );
  }
}

export default App;
