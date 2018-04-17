import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {   
    state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        players: ['','']
    }

    handleClick(i) {
        const squares = this.state.squares.slice();        
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X':'O';
        this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    updatePlayers = (players) => {        
        this.setState({players})
        
    }

    resetGame = () => {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            players: ['','']
        })
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        let gameOver=false;

        if (winner) {            
            gameOver = true;
            status = 'Winner: ' + ( (winner == 'X') ? this.state.players[0] : this.state.players[1]);
        } else {
            let gameEnd = true;
            for (var i = 0; i < this.state.squares.length; i++) {
                if (!this.state.squares[i]) {
                    gameEnd = false;
                    break;
                }
            }
            if (gameEnd) {
                status = 'Game is over, no winner is possible!';                 
                gameOver = true;
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? this.state.players[0] : this.state.players[1]);
            }            
        }

        return (
            <div className="game-container"> 
                <h3>LETS PLAY TIC-TAC-TOE!</h3>

                <Players onAddPlayers={this.updatePlayers} player1={this.state.players[0]} player2={this.state.players[1]} />
                                
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

                { gameOver ? <div><button onClick={this.resetGame}>Reset Game</button></div> : '' }
                                    
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

class PlayersUncontrolled extends React.Component {    

    addPlayers = () => {
        document.getElementById('player-1')
        var p1 = document.getElementById('player-1').value;
        var p2 = document.getElementById('player-2').value;        
        var players = [p1, p2]
        this.props.onAddPlayers(players);                
    }
    
    render(){
        const { onAddPlayers} = this.props;
        return(
            <div>
                <div>
                    <label >Player 1 Enter Your Name: </label>
                    <input value={this.props.player1} name='player-1' id='player-1'/>
                </div>                
                <div>                    
                    <label >Player 2 Enter Your Name: </label>
                    <input value={this.props.player2} name='player-2' id='player-2'/>                
                </div>
                <div>
                    <button onClick={this.addPlayers}>Add Players</button>
                </div>
            </div>                        
        );
    }
}

class Players extends React.Component {    

    state = {
        player1 : this.props.player1,
        player2 : this.props.player2
    }

    addPlayers = () => {
        var players = [this.state.player1, this.state.player2]
        this.props.onAddPlayers(players);                
    }
    
    handlePlayer=(e) => {        
        if(e.target.name === 'player-1'){
            this.setState({player1 : e.target.value})        
        }else{
            this.setState({player2 : e.target.value})        
        }            
    }    

    render(){
        const { onAddPlayers} = this.props;
        return(
            <div>
                <div>
                    <label >Player 1 Enter Your Name: </label>
                    <input value={this.state.player1} onChange={this.handlePlayer} name='player-1'/>
                </div>                
                <div>                    
                    <label >Player 2 Enter Your Name: </label>
                    <input value={this.state.player2} onChange={this.handlePlayer} name='player-2'/>                
                </div>
                <div>
                    <button onClick={this.addPlayers}>Add Players</button>
                </div>
            </div>                        
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


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