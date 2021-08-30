/*if(piece.type === WP){
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
}*/

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

	const ROWS = 8;
	const COLS = 8;

export default function getHighlights(grid, coords, whitesTurn) {
	console.log('in piecehandler')
	let { piece } = grid[coords.row][coords.col];
	console.log(`piece: ${piece.type}`)
	let pieceType = piece.type;
	
	if (pieceType === WP || pieceType === BP) { //Pawn
		return pawnHandler(grid, pieceType, coords, whitesTurn)
	} else if (pieceType === WN || pieceType === BN) { //Knight
		return knightHandler(grid, pieceType, coords, whitesTurn)
	} else if (pieceType === WB || pieceType === BB){ //Bishop
		return bishopHandler(grid, pieceType, coords, whitesTurn)
	} else if (pieceType === WR || pieceType === BR){ //Rook
		return rookHandler(grid, pieceType, coords, whitesTurn)
	} else if (pieceType === WQ || pieceType === BQ){ //Queen
		return queenHandler(grid, pieceType, coords, whitesTurn) 
	} else if (pieceType === WK || pieceType === BK) { //King
		return kingHandler(grid, pieceType, coords, whitesTurn)
	}	
}

function pawnHandler(grid, pieceType, coords, whitesTurn) {
	let { row, col } = coords;
	if(pieceType === WP) {
		if(!whitesTurn) return grid;
		if(row !== 0) {
			grid[row-1][col].highlighted = true;
		}
	}	else {
		if(whitesTurn) return grid;
		if(row !== ROWS-1) {
			grid[row+1][col].highlighted = true;
		}
	}

	return grid;
}

function knightHandler(grid, pieceType, coords, whitesTurn) {

}

function bishopHandler(grid, pieceType, coords, whitesTurn) {

}

function rookHandler(grid, pieceType, coords, whitesTurn) {
	let pieceFound = false;
}

function queenHandler(grid, pieceType, coords, whitesTurn) {

}

function kingHandler(grid, pieceType, coords, whitesTurn) {

}

function colRunner(grid, start, upperBound ) {

}

function rowRunner(grid, start, upperBound ) {

}

function diagRunner(grid, start, upperBound) {

}


