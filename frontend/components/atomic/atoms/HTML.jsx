import React, { Component } from "react";

export default class HTML extends Component {
	render() {
		return (
			<article
				dangerouslySetInnerHTML={{
					__html: this.props.content
				}}
			/>
		);
	}
}
