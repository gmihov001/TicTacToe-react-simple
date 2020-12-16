import React from "react";
import PropTypes from "prop-types";

//create your first component
export class Board extends React.Component {
	constructor() {
		super();

		this.state = {
			squareValues: ["", "", "", "", "", "", "", "", ""]
		};
	}

	updateNextMove = squarePressed => {
		var newSquareValues = this.state.squareValues.map(
			(item, position) =>
				position == squarePressed ? this.props.currentPlayer : item
		);
		console.log("The new square values: ", newSquareValues);
		this.setState({
			squareValues: newSquareValues
		});
		this.props.onMove(squarePressed);
		this.checkForWinner(newSquareValues);
		if (!newSquareValues.includes("")) {
			this.setState({
				squareValues: ["", "", "", "", "", "", "", "", ""]
			});
		}
	};

	checkForWinner(currentSquareValues) {
		//all the possible winning patterns in 3x3 tictactoe
		var winningCombinations = [
			//horizontal straight lines
			[1, 1, 1, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 1, 1, 1, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 1, 1, 1],

			//vertical straight lines
			[1, 0, 0, 1, 0, 0, 1, 0, 0],

			[0, 1, 0, 0, 1, 0, 0, 1, 0],

			[0, 0, 1, 0, 0, 1, 0, 0, 1],

			//diagonal straight lines
			[1, 0, 0, 0, 1, 0, 0, 0, 1],

			[0, 0, 1, 0, 1, 0, 1, 0, 0]
		];

		/**
		 * Im going to compare each winnig pattern with my current array of square values
		 * if one of them has the same pattern, I will declare the current player the winner
		 */

		winningCombinations.forEach(winningCombo => {
			// console.log(
			// 	"Checkinng if the current board matches the winnig pattern: ",
			// 	winningPattern
			// );
			var winner = this.checkWinningCombo(
				winningCombo, //each one of the winning combinations
				currentSquareValues //the newSquareValues from 15
			);
			if (winner != null) {
				// console.log("We have a winner and is: " + winner);
				this.props.onWinner(this.props.currentPlayer);
				this.setState({
					squareValues: ["", "", "", "", "", "", "", "", ""]
				});
			}
		});

		return null;
	}

	checkWinningCombo(winningCombo, currentSquareValues) {
		var successfullMatches = 0;
		for (var i = 0; i < winningCombo.length; i++) {
			if (winningCombo[i] == 1) {
				if (currentSquareValues[i] == this.props.currentPlayer) {
					successfullMatches++;
					// console.log(
					// 	successfullMatches +
					// 		" successfull match found for " +
					// 		this.props.currentPlayer
					// );
					if (successfullMatches > 2) {
						return this.props.currentPlayer;
					}
				}
			}
		}
	}

	render() {
		if (this.props.currentPlayer == null) return "";

		return (
			<div className="container">
				<div className="board clearfix">
					<div className="row">
						<div
							className="square"
							onClick={() => this.updateNextMove(0)}>
							{this.state.squareValues[0]}
						</div>
						<div
							className="square"
							onClick={() => this.updateNextMove(1)}>
							{this.state.squareValues[1]}
						</div>
						<div
							className="square"
							onClick={() => this.updateNextMove(2)}>
							{this.state.squareValues[2]}
						</div>
					</div>
					<div className="row">
						<div
							className="square"
							onClick={() => this.updateNextMove(3)}>
							{this.state.squareValues[3]}
						</div>
						<div
							className="square"
							onClick={() => this.updateNextMove(4)}>
							{this.state.squareValues[4]}
						</div>
						<div
							className="square"
							onClick={() => this.updateNextMove(5)}>
							{this.state.squareValues[5]}
						</div>
					</div>
					<div className="row">
						<div
							className="square"
							onClick={() => this.updateNextMove(6)}>
							{this.state.squareValues[6]}
						</div>
						<div
							className="square"
							onClick={() => this.updateNextMove(7)}>
							{this.state.squareValues[7]}
						</div>
						<div
							className="square"
							onClick={() => this.updateNextMove(8)}>
							{this.state.squareValues[8]}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Board.propTypes = {
	hide: PropTypes.bool,
	currentPlayer: PropTypes.string,
	onMove: PropTypes.func,
	onWinner: PropTypes.func
};
