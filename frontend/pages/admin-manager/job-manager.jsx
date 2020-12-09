import React, { Component } from "react";
import styled from "styled-components";
import { getWordPressDataPage } from "../../commonFunctions";

import CurrentUser from "../../components/queries/user/CurrentUser";

import RestrictAreaAdmin from "../../components/atomic/particles/RestrictAreaAdmin";

import HeaderAdmin from "../../components/header/Admin";

import JobControl from "../../components/jobs/JobControl";
import UpdateJob from "../../components/jobs/update/UpdateJob";

const JobManagerElement = styled.section`
	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);
`;

export default class JobManager extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`job-update`);
		return data;
	}

	render() {
		return (
			<RestrictAreaAdmin>
				<CurrentUser>
					{({ data: { me } }) => {
						if (!me) return "Can't find a user ID";
						return (
							<section>
								<HeaderAdmin />
								<h1>Job Management</h1>

								<UpdateJob
									content={this.props.content.content}
									id={this.props.query.id}
									user={me}
								/>
							</section>
						);
					}}
				</CurrentUser>
			</RestrictAreaAdmin>
		);
	}
}
