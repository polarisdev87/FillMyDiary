import React, { Component } from "react";
import { getWordPressDataPage } from "../commonFunctions";

import RestrictAreaUser from "../components/atomic/particles/RestrictAreaUser";

import Wrapper from "../components/atomic/molecules/Wrapper";

import JobApplications from "../components/applications/JobApplications";

export default class Applications extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`applications`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<RestrictAreaUser>
					<JobApplications
						content={this.props.content.content}
						id={this.props.query.id}
					/>
				</RestrictAreaUser>
			</Wrapper>
		);
	}
}
