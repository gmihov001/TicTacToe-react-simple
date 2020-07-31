import React from "react";
import PropTypes from "prop-types";
//create your first component
export class ChoosePlayer extends React.Component {
	constructor(props) {
		super(props);
		this.player1 = null;
		this.player2 = null;
	}

	render() {
		return (
			<div
				style={{ display: this.props.hide ? "block" : "none" }}
				id="modal-container">
				<div className="choose-modal">
					<h3>Choose Your Weapon</h3>
					<div>
						<input
							type="text"
							placeholder="Player 1 username"
							onChange={evt => (this.player1 = evt.target.value)}
						/>
						<input
							type="text"
							placeholder="Player 2 username"
							onChange={evt => (this.player2 = evt.target.value)}
						/>
					</div>
					<div className="button-area">
						<span
							onClick={() =>
								this.props.onSetTurn(
									"x",
									this.player1,
									this.player2
								)
							}
							className="x-marker">
							X
						</span>
						<span
							onClick={() =>
								this.props.onSetTurn(
									"o",
									this.player1,
									this.player2
								)
							}
							className="o-marker">
							O
						</span>
					</div>
				</div>
				<div className="end-game-modal">
					<h3 />
					<p>Try harder next time!</p>
					<div className="button-area">
						<span>Play Again</span>
					</div>
				</div>
			</div>
		);
	}
}

ChoosePlayer.propTypes = {
	hide: PropTypes.bool,
	onSetTurn: PropTypes.func
};
