import React, { Component } from 'react';
import Square from '../../components/Square/Square';
import classes from './CrosswordGrid.module.css';

class CrosswordGrid extends Component {
  state = {
    solution: this.props.solution,
    isCompleted: false,
  }

  crosswordGrid = this.populateCrosswordGrid()

  populateCrosswordGrid() {
    let grid = [];
    let numbering = 1;
    let solution = this.props.solution;
    for (let key in solution) {
      grid.push(solution[key].split(''));
    }

    for (let i = 0; i < grid.length; i++) {
      let row = grid[i];
      for (let j = 0; j < row.length; j++) {
        grid[i][j] = {
          letter: grid[i][j] !== ' ' ? grid[i][j] : null,
          row: i,
          column: j,
          correct: grid[i][j] === ' ' ? true : false
        }

        // squares that border the grid or blank top or left are numbered
        if (grid[i][j].letter && 
              (i === 0 || 
                j === 0 || 
                !grid[i - 1][j].letter || 
                !grid[i][j - 1].letter)) {
          grid[i][j].number = numbering;
          numbering++;
        }
      }
    }

    console.log(grid.flat().some((square) => !square.correct));
    return grid;
  }

  onFocusHandler = (event, index) => {
  }

  onKeyDownHandler = (event, index) => {
  }

  onChangeHandler = (event, index) => {
    let [row, column] = index.split(',');
    if (this.crosswordGrid[row][column].letter === event.target.value.toUpperCase()) {
      this.crosswordGrid[row][column].correct = true;
    }

    // determine if the puzzle has been solved
    if (this.crosswordGrid.flat().every((square) => square.correct)) {
      this.setState({isCompleted: true});
      alert('You finished the puzzle!');
    }

    const flatGrid = this.crosswordGrid.flat();
    const nextSquareGrid = flatGrid.slice((+row) * Math.sqrt(flatGrid.length) + (+column) + 1);
    const nextSquare = nextSquareGrid.find((square) => square.letter);
    
    if (nextSquare) {
      document.querySelector(`input[index="${nextSquare.row},${nextSquare.column}"]`).focus();
    }
  }

  render() {
    return (
      <div className={classes.CrosswordGrid} style={
        {
          gridTemplateRows: `repeat(${this.props.width}, 35px)`, 
          gridTemplateColumns: `repeat(${this.props.height}, 35px)`
        }
      }>
        {this.crosswordGrid.map((squares) => {
          return squares.map((square) => {
            let letter = square.letter;
            let row = square.row;
            let column = square.column;
            return <Square 
                      answer={letter}
                      blank={!letter}
                      tabindex={!letter ? '-1' : '1'}
                      numbering={square.number}
                      onFocus={this.onFocusHandler}
                      onKeyDown={this.onKeyDownHandler}
                      onChange={this.onChangeHandler}
                      index={`${row},${column}`}
                      key={`${row},${column}`}
                    />
          });
        })}
      </div>
    );
  }
}

export default CrosswordGrid;