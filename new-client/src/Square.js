import React from 'react';
import { render } from 'react-dom';
import './Square.css';
import Piece from './Piece';

class Square extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggle: false,
									className: "square " + this.props.shade,
									hasPiece: false};


		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let toggled = !this.state.isToggle;
		let new_className = toggled? "square square-yellow" : "square " + this.props.shade;
		
		this.setState({
			isToggle: toggled,
			className: new_className,
			hasPiece: true
		});
	}

	render() {
		let piece = this.state.hasPiece? <Piece></Piece> : "";
		return (
			<button className={this.state.className}
			id={this.props.id}
			col={this.props.col}
			row={this.props.row}
			style={this.props.style}
			onClick={this.handleClick}>
				{piece}
			</button>
		);
	}
}	

export default Square;