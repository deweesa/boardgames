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

	const EMPTY_SQUARE = { color: '',
												type: ''
											}

export default class PieceHandler {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.grid = null;
		this.whitesTurn = null;
	}

	getHighlights(grid, coords, whitesTurn) {
		this.grid = grid;
		this.whitesTurn = whitesTurn;

		let { piece } = grid[coords.row][coords.col];
		let pieceType = piece.type;

		console.log(this.grid);
		
		if (pieceType === WP || pieceType === BP) { //Pawn
			return this.pawnHandler(grid, pieceType, coords, whitesTurn)
		} else if (pieceType === WN || pieceType === BN) { //Knight
			this.knightHandler(grid, pieceType, coords, whitesTurn)
		} else if (pieceType === WB || pieceType === BB) { //Bishop
			this.bishopHandler(grid, pieceType, coords, whitesTurn)
		} else if (pieceType === WR || pieceType === BR) { //Rook
			this.rookHandler(grid, pieceType, coords, whitesTurn)
		} else if (pieceType === WQ || pieceType === BQ) { //Queen
			this.queenHandler(grid, pieceType, coords, whitesTurn) 
		} else if (pieceType === WK || pieceType === BK) { //King
			this.kingHandler(grid, pieceType, coords, whitesTurn)
		}	

		return this.grid;
	}

	pawnHandler(grid, pieceType, coords, whitesTurn) {
		let { row, col } = coords;
		if(pieceType === WP) {
			if(!whitesTurn) return grid;
			if(row !== 0) {
				grid[row-1][col].highlighted = true;
			}
		}	else {
			if(whitesTurn) return grid;
			if(row !== this.rows-1) {
				grid[row+1][col].highlighted = true;
			}
		}

		return grid;
	}

	knightHandler(grid, pieceType, coords, whitesTurn) {
		var possibleMoves = [];

		possibleMoves.push({
			row: (coords.row+2),
			col: (coords.col+1)
		})
		possibleMoves.push({
			row: coords.row+2,
			col: coords.col-1
		})
		possibleMoves.push({
			row: coords.row-2,
			col: coords.col+1
		})
		possibleMoves.push({
			row: coords.row-2,
			col: coords.col-1
		})
		possibleMoves.push({
			row: coords.row+1,
			col: coords.col+2
		})
		possibleMoves.push({
			row: coords.row+1,
			col: coords.col-2
		})
		possibleMoves.push({
			row: coords.row-1,
			col: coords.col+2
		})
		possibleMoves.push({
			row: coords.row-1,
			col: coords.col-2
		})

		console.log(possibleMoves)
		for(let move of possibleMoves) {
			if(move.row >= 0 && move.row < this.rows && move.col >= 0 && move.col < this.cols) {
				this.highlighter(move.row, move.col);
			}
		}
	}

	bishopHandler(grid, pieceType, coords, whitesTurn) {
		this.diagRunner(coords);
	}

	rookHandler(grid, pieceType, coords, whitesTurn) {
		this.colRunner(coords);
		this.rowRunner(coords);
	}

	queenHandler(grid, pieceType, coords, whitesTurn) {
		this.colRunner(coords);
		this.rowRunner(coords);
		this.diagRunner(coords);
	}

	kingHandler(grid, pieceType, coords, whitesTurn) {
		let { row, col } = coords;
		let possibleMoves = [];
		
		for(let i = col-1; i < col+2; i++) {
			for(let j = row-1; j < row+2; j++) {
				possibleMoves.push({
					row: j,
					col: i
				})
			}
		}

		console.log(possibleMoves);

		for(const move of possibleMoves) {
			if(move.row >= 0 && move.row < this.rows && move.col >= 0 && move.col < this.cols) {
				this.highlighter(move.row, move.col);
			}
		}
	}

	colRunner(coords) {
		const { row, col } = coords;
		let pieceFound = false;
		
		//N
		let runner = row-1;
		while(runner >= 0 && !pieceFound) {
			pieceFound = this.highlighter(runner, col);
			runner--;
		}

		//S
		pieceFound = false;
		runner = row+1;
		while(runner < this.rows && !pieceFound) {
			pieceFound = this.highlighter(runner, col);
			console.log(pieceFound)
			runner++;
		}
	}

	rowRunner(coords) {
		const { row, col } = coords;
		let pieceFound = false;

		//E
		let runner = col-1;
		while(runner >= 0 && !pieceFound) {
			pieceFound = this.highlighter(row, runner);
			runner--;
		}

		//W
		pieceFound = false;
		runner = col+1;
		while(runner < this.cols && !pieceFound) {
			pieceFound = this.highlighter(row, runner);
			runner++;
		}
	}

	diagRunner(coords) {
		const { row, col } = coords;

		//NW
		let pieceFound = false;
		let rowRun = row-1, colRun = col-1;
		while(rowRun >= 0 && colRun >= 0 && !pieceFound) {
			pieceFound = this.highlighter(rowRun, colRun);
			rowRun--;
			colRun--;
		}

		//NE
		pieceFound = false;
		rowRun = row-1 
		colRun = col+1;
		while(rowRun >= 0 && colRun < this.cols && !pieceFound) {
			pieceFound = this.highlighter(rowRun, colRun);
			rowRun--;
			colRun++;
		}

		//SW
		pieceFound = false;
		rowRun = row+1;
		colRun = col-1;
		while(rowRun < this.rows && colRun >= 0 && !pieceFound) {
			pieceFound = this.highlighter(rowRun, colRun);
			rowRun++;
			colRun--;
		}

		//SE
		pieceFound = false;
		rowRun = row+1;
		colRun = col+1;
		while(rowRun < this.rows && colRun < this.cols && !pieceFound) {
			pieceFound = this.highlighter(rowRun, colRun);
			rowRun++;
			colRun++;
		}
	}

	highlighter(row, col) {
		let { grid, whitesTurn } = this;
		let pieceFound = false;

		let piece = grid[row][col].piece;
		if(piece.type === EMPTY_SQUARE.type) {
			grid[row][col].highlighted = true;
		} else {
			pieceFound = true;

			if(whitesTurn && piece.color === 'b') {
				grid[row][col].highlighted = true;
			} else if(!whitesTurn && piece.color === 'w') {
				grid[row][col].highlighted = true;
			}
		}

		this.grid = grid;
		return pieceFound
	}
}