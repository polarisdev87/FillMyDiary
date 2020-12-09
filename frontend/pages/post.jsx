import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import { getWordPressDataPage } from "../commonFunctions";

import RestrictAreaUser from "../components/atomic/particles/RestrictAreaUser";

import HR from "../components/atomic/atoms/HR";

import Wrapper from "../components/atomic/molecules/Wrapper";

import CreateJob from "../components/jobs/create/CreateJob";

export default class Post extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`post`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<HR invisible={true} />
				{this.props.content && (
					<Row>
						<Col lg={6}>
							<h1>{this.props.content.content["heading_one"].value}</h1>
							<p
								dangerouslySetInnerHTML={{
									__html: this.props.content.content["paragraph_one"].value
								}}
							/>
						</Col>
					</Row>
				)}
				<RestrictAreaUser>
					<CreateJob content={this.props.content.content} />
				</RestrictAreaUser>
			</Wrapper>
		);
	}
}
