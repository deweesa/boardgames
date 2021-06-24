import React from 'react';
import Square from './Square.js';
import Piece from './Piece.js';

export default class Board extends React.Component {
	render() {
		return(
			<div>
				{this.makeBoard()}
				<Piece/>
			</div>
		);

	}

	makeBoard() {
		var rows = [];
		var isLight = true
		for(let i = 0; i < 8; i++) {
			for(let j = 0; j < 8; j++) {
				let shade = isLight? "square-light" : "square-dark";

				rows.push(<Square shade={shade} id={i+","+j} row={j} col={i} piece={<Piece/>}/>);
				isLight = !isLight;
			}
			isLight = !isLight;
			rows.push(<br></br>)
		}

		return rows;
	}
}