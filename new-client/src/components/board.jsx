import React, { Component } from 'react';
import './board.css';
import Square from './Square';

	//Pawn
	const WP = '\u2659'
	const BP = '\u265f'

	//King
	const WK = '\u2654'
	const BK = '\u265a'

	//Queen
	const WQ = '\u2655'
	const BQ = '\u265b'

	//Rook
	const WR = '\u2656'
	const BR = '\u265c'

	//Bishop
	const WB = '\u2657'
	const BB = '\u265D'

	//Knight
	const WN = '\u2658'
	const BN = '\u265E'

	const W_PIECES = [WP, WK, WQ, WR, WB, WN]
	const B_PIECES = [BP, BK, BQ, BR, BB, BN]

	const fenStart = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

	const EMPTY_SQUARE = { color: '',
												type: ''
											}

export default class Board extends Component {
	/* TODO:
	*/

	constructor(props) {
		super(props)

		/* ! Order of board represented is that black pieces are first 
				 two rows, and white peices are last two rows */
		this.state = {
			rows: props.rows,
			cols: props.cols,
			grid: (() => {
				var i = 0;
				var rows = [], currentRow = [];	
				var col = 0, row = 0
				const highlighted = false
				var curr_char = fenStart[i];

				while(curr_char !== ' ') {
					if(curr_char === '/') {
						rows.push(currentRow)
						currentRow = [];
						row++;
						col = 0;
					}
					else if(curr_char.charCodeAt() < 58) {
						let empty_spaces = parseInt(curr_char);
						for(let j = 0; j < empty_spaces; j++) {
							currentRow.push({
								row, 
								col,
								highlighted,
								piece: EMPTY_SQUARE
							})	
							col++;
						}
					} else {
						currentRow.push({
							row,
							col,
							highlighted,
							piece: this.charToPiece(curr_char)
						})
						col++;
					}	
					i++;
					curr_char = fenStart[i];
				}

				rows.push(currentRow);
				return rows;
			})(),
			sourceSelected: false,
			destinationSelected: false,
			whitesTurn: true
		}
	}

	charToPiece = (char) => {
		var color = (char.charCodeAt() > 96)? 'b' : 'w';
		var piece = '';
		switch(char) {
			case 'k':
				piece =  BK;
				break;
			case 'q':
				piece = BQ;
				break;
			case 'b':
				piece = BB;
				break;
			case 'r':
				piece = BR;
				break;
			case 'n':
				piece = BN;
				break;
			case 'p': 
				piece = BP;
				break;
			
			case 'K':
				piece = WK;
				break;
			case 'Q':
				piece = WQ;
				break;
			case 'B':
				piece = WB;
				break;
			case 'R': 
				piece = WR;
				break;
			case 'N':
				piece = WN;
				break;
			case 'P': 
				piece = WP;
				break;
		}

		return {
			color,
			type: piece
		}
	}

	highlightSquares = (sourceCoordinates, piece, grid) => {
			let { whitesTurn } = this.state;
			const { row, col } = sourceCoordinates;

			if(piece.type === WP){
				if(piece.row === 0) return; //bounds check that we are at the top of the board
				let coords = {
					row: sourceCoordinates.row-1,
					col: sourceCoordinates.col
				}				
				grid[coords.row][coords.col].highlighted = true;

			} else if(piece.type === BP) {
				if(piece.row === 7) return; //bounds check that we are at the bottom of the board
				let coords = {
					row: sourceCoordinates.row+1,
					col: sourceCoordinates.col
				}
				grid[coords.row][coords.col].highlighted = true;

			} else if(piece.type === WR || piece.type === BR) {
				let piece_found;

				//North
				let n_runner = row - 1;
				piece_found = false;
				while(n_runner >= 0 && !piece_found) {
					if(grid[n_runner][col].piece === EMPTY_SQUARE) {
						grid[n_runner][col].highlighted = true;
					} else {
						piece_found = true;

						let piece = grid[n_runner][col].piece;
						console.log(piece);
						if(whitesTurn && piece.color === 'b') {
							grid[n_runner][col].highlighted = true;
						} else if(!whitesTurn && piece.color === 'w') {
							grid[n_runner][col].highlighted = true;
						}
					}

					n_runner--;
				}

				//South 
				let s_runner = row + 1;
				piece_found = false;
				while(s_runner < this.state.rows && !piece_found){
					if(grid[s_runner][col].piece === EMPTY_SQUARE) {
						grid[s_runner][col].highlighted = true;
					} else {
						console.log('south else check')
						piece_found = true;

						let piece = grid[s_runner][col].piece;
						console.log(piece);
						if(whitesTurn && piece.color === 'b') {
							grid[s_runner][col].highlighted = true;
						} else if(!whitesTurn && piece.color === 'w') {
							grid[s_runner][col].highlighted = true;
						}
					}

					s_runner++;
				}

				//West
				let w_runner = col - 1;
				piece_found = false;
				while(w_runner >= 0 && !piece_found) {
					if(grid[row][w_runner].piece === EMPTY_SQUARE) {
						grid[row][w_runner].highlighted = true;
					} else {
						console.log('west else check')
						piece_found = true;

						let piece = grid[row][w_runner].piece;
						console.log(piece);
						if(whitesTurn && piece.color === 'b') {
							grid[row][w_runner].highlighted = true;
						} else if(!whitesTurn && piece.color === 'w') {
							grid[row][w_runner].highlighted = true;
						}
					}

					w_runner--;
				}

				//East
				let e_runner = col + 1;
				piece_found = false;
				while(e_runner < this.state.cols && !piece_found){
					if(grid[row][e_runner].piece === EMPTY_SQUARE) {
						grid[row][e_runner].highlighted = true;
					} else {
						console.log('east else check')
						console.log(`${row}-${e_runner}`)
						piece_found = true;

						let piece = grid[row][e_runner].piece;
						console.log(piece);
						if(whitesTurn && piece.color === 'b') {
							console.log('why aint you going')
							grid[row][e_runner].highlighted = true;
						} else if(!whitesTurn && piece.color === 'w') {
							grid[row][e_runner].highlighted = true;
						}				
					}

					e_runner++;
				}
			} else if(piece.type === WB || piece.type === BB) {
				let piece_found = false;

				//NW
				let row_runner = row - 1;
				let col_runner = col - 1;

				while(row_runner >= 0 && col_runner >= 0 && !piece_found) {
					if(grid[row_runner][col_runner].piece = EMPTY_SQUARE) {
						grid[row_runner][col_runner].highlighted = true;
					} else {
						piece_found = true;
						
						
					}
				}

				//NE
				//SW
				//SE
			}

			return grid 
			
	};

	clearHighlights = (grid) => {
		for(let i = 0; i < this.state.rows; i++) {
			for(let j = 0; j < this.state.cols; j++) {
				grid[i][j].highlighted = false;
			}
		}

		return grid;
	}

	handleCallback = (childData) => {
		console.log(childData);

		let {row, col, piece} = childData;
		let {grid, sourceSelected, destinationSelected, whitesTurn} = this.state;

		let enemyPiece = whitesTurn? 'b' : 'w';

		//Source hasn't been selected
		if(!sourceSelected) { 
			
			//Check to see if player selects and empty square or the other players square.
			//If so return and do nothing.
			if(piece.type === '' || piece.color === enemyPiece) return; //checks out on FIRST PICK

			sourceSelected = true;	
			let sourceCoordinates = {row, col};
			
			let newGrid = this.highlightSquares(sourceCoordinates, piece, grid)

			this.setState({
				...this.state,
				sourceCoordinates,
				sourceSelected,
				grid:	newGrid 
			})

			return;

		} else {
			if(piece.type !== '' && piece.color !== enemyPiece) return;
			if(grid[row][col].highlighted === false) return;
			let {sourceCoordinates, highlightList} = this.state

			console.log('a valid destination was selected')

			grid[row][col].piece = grid[sourceCoordinates.row][sourceCoordinates.col].piece
			grid[sourceCoordinates.row][sourceCoordinates.col].piece = EMPTY_SQUARE

			grid = this.clearHighlights(grid);

			this.setState({
				...this.state,
				whitesTurn: !whitesTurn,
				//highlightList: [],
				sourceSelected: false,
				grid
			})
		}
	}

	render() {
		var isLight = false;
		const board = this.state.grid.map((row) => {
			isLight = !isLight;
			return row.map((square) => {
				let squareColor = square.highlighted? "highlighted" : isLight? "light-square" : "dark-square";	
				isLight = !isLight;
				const key = square.row.toString() + '-' + square.col.toString();
				return <Square key={key} row={square.row} col={square.col} color={squareColor} piece={square.piece} parentCallback={this.handleCallback}/>
			})
		})

		return(
			<div className="board-container">
				<div className="grid">
					{board}
				</div>
			</div>
		)
	}
}