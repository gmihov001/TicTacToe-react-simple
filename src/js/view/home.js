import React from "react";
import { Board } from "../component/board.js";
import { ChoosePlayer } from "../component/chooseplayer.js";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			player: null,
			winner: null
		};
	}

	startGame = () => {
		console.log("Start Game");
		this.setState({ player: null });
	};

	setTurn = (currentPlayer, player1, player2) => {
		this.setState({
			player: currentPlayer,
			player1: player1,
			player2: player2
		});
	};

	nextMove = position => {
		console.log("Next move at position: ", position);
		this.setState({
			player: this.state.player == "x" ? "o" : "x"
		});
	};

	declareWinner(winner) {
		this.setState({
			winner: winner
		});
	}

	renderMessage() {
		if (this.state.player == null) {
			return <h2 id="message">Pick A Weapon</h2>;
		} else {
			if (this.state.winner == null) {
				return (
					<div>
						<h2>It is {this.state.player.toUpperCase()} turn!</h2>
						<button
							className="btn btn-lg btn-secondary"
							onClick={this.startGame.bind(this)}>
							Start Over
						</button>
					</div>
				);
			} else {
				return (
					<div>
						<h1 style={{ color: "green" }}>
							{this.state.winner.toUpperCase()} WINS!!!
						</h1>
						<button
							className="btn btn-lg btn-success"
							style={{ background: "green" }}
							onClick={this.startGame.bind(this)}>
							Start Over!
						</button>
					</div>
				);
			}
		}
	}

	render() {
		return (
			<div id="msg">
				<h1>
					Tic Tac Toe <small>in React.js</small>
				</h1>
				{this.renderMessage()}
				<Board
					currentPlayer={this.state.player}
					onMove={this.nextMove.bind(this)}
					onWinner={this.declareWinner.bind(this)}
				/>
				<ChoosePlayer
					hide={this.state.player == null ? true : false}
					onSetTurn={this.setTurn.bind(this)}
				/>
			</div>
		);
	}
}
