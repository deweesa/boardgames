import React from 'react';
import Square from './Square.js';

export default class Board extends React.Component {
	render() {
		return(
			<div>
				<h1>How this is now the page</h1>
				<p>wee waa</p>
				{this.makeBoard()}
				{Square()}
			</div>
		);
	}

	makeBoard() {
		var rows = [];
		for(let i = 0; i < 8; i++) {
			for(let j = 0; j < 8; j++) {
				rows.push(Square());
			}
			rows.push(<br></br>)
		}

		return rows;
	}
}