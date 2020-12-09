import React, { Component } from "react";

class Paragraph extends Component {
	render() {
		const { text } = this.props;

		return <p>{text}</p>;
	}
}

export default Paragraph;
