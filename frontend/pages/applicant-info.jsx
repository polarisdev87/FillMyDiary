import React, { Component } from "react";
import { getWordPressDataPage } from "../commonFunctions";

import RestrictAreaUser from "../components/atomic/particles/RestrictAreaUser";

import JobApplicationsSuccess from "../components/applications/JobApplicationsSuccess";

export default class ApplicantInfo extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`applicant-info`);
		return data;
	}

	render() {
		return (
			<RestrictAreaUser>
				<JobApplicationsSuccess
					content={this.props.content.content}
					id={this.props.query.id}
				/>
			</RestrictAreaUser>
		);
	}
}
