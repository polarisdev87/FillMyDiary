import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import { getWordPressDataPage } from "../commonFunctions";

import CurrentUser from "../components/queries/user/CurrentUser";

import CreateMarkup from "../components/atomic/particles/CreateMarkup";
import RestrictAreaUser from "../components/atomic/particles/RestrictAreaUser";

import HR from "../components/atomic/atoms/HR";

import Wrapper from "../components/atomic/molecules/Wrapper";

import UpdateJob from "../components/jobs/update/UpdateJob";

export default class Post extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`job-update`);
		return data;
	}

	render() {
		if (!this.props.me) return "Must be logged in to view this page";

		return (
			<Wrapper>
				<RestrictAreaUser me={this.props.me}>
					<HR invisible={true} />
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
					<UpdateJob
						content={this.props.content.content}
						id={this.props.query.id}
						user={this.props.me}
					/>
				</RestrictAreaUser>
			</Wrapper>
		);
	}
}
