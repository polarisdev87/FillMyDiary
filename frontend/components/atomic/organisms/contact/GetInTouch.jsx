import React, { Component } from "react";
import { Row, Col } from "react-grid-system";

import Support from "../form/Support";

export default class GetInTouch extends Component {
	render() {
		return (
			<Row>
				<Col lg={5}>
					{this.props.content && (
						<div dangerouslySetInnerHTML={{ __html: this.props.content }} />
					)}
				</Col>
				<Col lg={6} offset={{ lg: 1 }}>
					<Support />
				</Col>
			</Row>
		);
	}
}
