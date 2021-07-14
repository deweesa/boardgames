import React, { Component } from 'react';
import './board.css';

export default class Board extends Component {
	/* TODO:
	*/
	state = {};

	constructor(props) {
		super(props)

		this.state = {
			rows: props.rows,
			cols: props.cols,
			grid:	(() => {
				let grid = [];
				for(let row = 0; row < props.rows; row++) {
					for(let col = 0; col < props.cols; col++) {
						grid.push({row, col});
					}
				}

				return grid;
			})()
		}
	}

	render() {
		let isLight = true;

		const gridItems = this.state.grid.map((grid) => {
			let gridColor = isLight? "light-grid" : "dark-grid";
			isLight = !isLight;
			if(grid.col === 7) isLight = !isLight;

			return <div key={grid.row.toString() + '-' + grid.col.toString()}
				className={"grid-item " + gridColor}></div>
		})

		return(
			<div className="board-container">
				<div className="grid">
					{gridItems}
				</div>
			</div>
		)
	}
}