import React from 'react';
import './Square.css';

function Square(props) {
	return (
		<button className={"square " + props.shade}
		style={props.style}>
		</button>
	);
}	

export default Square;