import React from 'react';
import './Piece.css'

class Piece extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<span className="piece"></span>
		)
	}
}

export default Piece;