import React from 'react';
import { render } from 'react-dom';
import './Square.css';

class Square extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggle: false,
									className: "square " + this.props.shade};


		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		let toggled = !this.state.isToggle;
		let new_className = toggled? "square square-yellow" : "square " + this.props.shade;
		
		this.setState({
			isToggle: toggled,
			className: new_className
		});
	}

	render() {
		return (
			<button className={this.state.className}
			id={this.props.id}
			style={this.props.style}
			onClick={this.handleClick}>
			</button>
		);
	}
}	

export default Square;