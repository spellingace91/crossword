import React, { Component } from 'react';
import Square from '../../components/Square/Square';
import classes from './CrosswordGrid.module.css';

class CrosswordGrid extends Component {
  state = {
    solution: this.props.solution,
    isStarted: false,
    isCompleted: false,
    counter: 0,
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
    
    return grid;
  }

  onKeyDownHandler = (index, event) => {
    event.preventDefault();

    const key = event.key;
    let [row, column] = index.split(',');
    row = +row;
    column = +column;
    const crosswordGrid = this.crosswordGrid;
    const flatGrid = crosswordGrid.flat();
    let nextSquareGrid = [];
    let nextSquare = {};

    crosswordGrid[row][column].correct = crosswordGrid[row][column].letter === key.toUpperCase();

    // determine if the puzzle has been solved
    if (crosswordGrid.flat().every((square) => square.correct)) {
      this.setState({isCompleted: true});
      this.props.onCompleted();
    }

    // if a letter was pressed
    if (key && /^[a-zA-Z]{1}$/.test(key)) {
      event.target.value = key.toUpperCase();
      nextSquareGrid = flatGrid.slice(
        row * Math.sqrt(flatGrid.length) + column + 1
      );
      nextSquare = nextSquareGrid.find((square) => square.letter);
      
      if (nextSquare) {
        document.querySelector(
          `input[index="${nextSquare.row},${nextSquare.column}"]`)
          .focus();
      }

      if (!this.state.isStarted) {
        this.props.onStartTimer();
        this.setState({isStarted: true});
      }
    }
    // if navigation keys were pressed
    else {
      switch (event.nativeEvent.keyCode) {
        case 8: // backspace
          event.target.value = '';
          break;
        case 9: // tab
          // TODO: implement word grouping
          break;
        case 32: // space bar
          break;
        case 37: // left arrow
          if (row === 0 && column === 0) {
            document.querySelector(`input[index="${crosswordGrid.length - 1},${crosswordGrid.length - 1}"]`).focus();
          }
          else {
            nextSquareGrid = flatGrid.slice(
              0, row * Math.sqrt(flatGrid.length) + column
            ).filter((square) => square.letter);
            nextSquare = nextSquareGrid[nextSquareGrid.length - 1];

            if (nextSquare) {
              document.querySelector(
                `input[index="${nextSquare.row},${nextSquare.column}"]`).focus();
            }
          }
          break;
        case 38: // up arrow
          // if we're at the top of the grid, we move to the last row
          const targetRow = row === 0 ? crosswordGrid.length - 1 : row - 1;

          nextSquareGrid = flatGrid.slice(
            0, targetRow * Math.sqrt(flatGrid.length) + column + 1
          ).filter((square) =>
            square.letter && square.column === column);
          // if there are no letter squares above (just blanks), wrap around
          if (nextSquareGrid.length === 0) {
            nextSquareGrid = flatGrid.slice(
              row * Math.sqrt(flatGrid.length) + column
            ).filter((square) => square.letter && square.column === column);
          }
          nextSquare = nextSquareGrid[nextSquareGrid.length - 1];

          if (nextSquare) {
            document.querySelector(
              `input[index="${nextSquare.row},${nextSquare.column}"]`).focus();
          }
          break;
        case 39: // right arrow
          if (row === crosswordGrid.length - 1 
                && column === crosswordGrid.length - 1) {
                  document.querySelector(`input[index="0,0"]`).focus();
                }
          else {
            nextSquareGrid = flatGrid.slice(
              row * Math.sqrt(flatGrid.length) + column + 1
            );
            nextSquare = nextSquareGrid.find((square) => square.letter);

            if (nextSquare) {
              document.querySelector(
                `input[index="${nextSquare.row},${nextSquare.column}"]`).focus();
            }
          }
          break;
        case 40: // down arrow
          const targetRowDown = (row === crosswordGrid.length - 1) ? 0 : row + 1;

          nextSquareGrid = flatGrid.slice(
            targetRowDown * Math.sqrt(flatGrid.length) + column
          ).filter((square) => 
            square.letter && square.column === column);
          // if there are no letter square below (just blanks), wrap around
          if (nextSquareGrid.length === 0) {
            nextSquareGrid = flatGrid.filter((square) => 
              square.letter && square.column === column
            );
          }
          nextSquare = nextSquareGrid[0];

          if (nextSquare) {
            document.querySelector(
              `input[index="${nextSquare.row},${nextSquare.column}"]`).focus();
          }
          break;
        default:
          break;
      }
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
                      onKeyDown={this.onKeyDownHandler.bind(this)}
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