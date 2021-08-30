import React, { Component } from 'react';

export default class Square extends Component {

	constructor(props) {
		super(props);
	}

	onClick = (event) => {
		let { piece, row, col, parentCallback } = this.props
		
		parentCallback({
			row,
			col,
			piece
		})
	}

	render() {
		const {color, keyValue} = this.props;
		return(
			<div className="square" color={color} key={keyValue} onClick={this.onClick}>
				{this.props.piece.type}
			</div>
		)	
	}
}