import React, { Component } from 'react';
import Square from '../../components/Square/Square';
import classes from './CrosswordGrid.module.css';

class CrosswordGrid extends Component {
  state = {
    solution: this.props.solution,
    isCompleted: false
  }

  render() {
    let grid = [];
    let solution = this.props.solution;
    for (let key in solution) {
      grid.push(solution[key].split(''));
    }

    return (
      <div className={classes.CrosswordGrid} style={
        {
          gridTemplateRows: `repeat(${this.props.width}, 35px)`, 
          gridTemplateColumns: `repeat(${this.props.height}, 35px)`
        }
      }>
        {grid.map((square, rowIndex) => {
          return square.map((letter, index) => {
            return <Square 
                      answer={letter !== ' ' ? letter : null}
                      blank={letter === ' '}
                      tabindex={letter === ' ' ? '-1' : '1'}
                      key={'' + rowIndex + index} />
          });
        })}
      </div>
    );
  }
}

export default CrosswordGrid;