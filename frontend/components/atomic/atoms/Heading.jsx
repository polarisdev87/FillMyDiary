import React, { Component } from "react";

class Hero extends Component {
	render() {
		const { level, semantic, text } = this.props;

		const HeadingComponent = semantic;

		return <HeadingComponent className={level}>{text}</HeadingComponent>;
	}
}

export default Hero;
