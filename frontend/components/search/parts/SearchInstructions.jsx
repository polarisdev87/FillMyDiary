import React, { Component } from "react";

export default class SearchInstructions extends Component {
	render() {
		const { content } = this.props;
		return (
			<section>
				<h2>{content["heading_one"].value}</h2>

				<p
					dangerouslySetInnerHTML={{
						__html: content["paragraph_one"].value
					}}
				/>
			</section>
		);
	}
}
