import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Basic from './myform';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
/*
class Square extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            value: null,
            score: 0,
        };
    }

    render() {
        return (
            <button 
                className="square"
                onClick={ () => { this.props.onClick(); } }
                onClick={ 
                    () => { 
                        //alert("กด"+this.props.value); 
                        this.setState(
                            {
                                value: 'X',
                                score: 1,
                            }
                        );
                    }
            }
            >
            {this.state.value}
            </button>
        );
    }
}
*/

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(""),
            x: true,
        };   
    }
    handleClick(i) {
        const updateSquares = this.state.squares.slice();
        if (calculateWinner(updateSquares) || updateSquares[i]) {
            return;
          }
        updateSquares[i] = this.state.x?'X':'O';
        this.setState({
            squares: updateSquares,
            x: !this.state.x,
        });
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} 
            onClick={ ()=>{ this.handleClick(i); } } />;
    }

    render() {
    //    const status = 'ผู้เล่นคนถัดไป: '+(this.state.x?'X':'O');
        const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

        return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Basic />,
  document.getElementById('root')
);
