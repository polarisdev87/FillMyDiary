import React, { Component } from "react";
import styled from "styled-components";

import SingleApplication from "./SingleApplication";

const ApplicationListElement = styled.section`
	margin-top: 64px;
	padding: 32px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);
`;

export default class ApplicationList extends Component {
	state = {
		acceptedApplicant: false,
		acceptedUser: {}
	};

	acceptApplication(user) {
		this.setState({ acceptedApplicant: true, acceptedUser: user });
	}

	render() {
		const { index, applications, complete } = this.props;

		if (complete) {
			return (
				<ApplicationListElement>
					<h2>You have already accepted an applicant</h2>
				</ApplicationListElement>
			);
		}

		if (!applications) {
			return (
				<ApplicationListElement>
					<h2>Waiting for Applicants</h2>
					<p>
						Your job is live and awaiting applicants. We'll send you an email
						when any applications are made for your job.
					</p>
				</ApplicationListElement>
			);
		}

		return (
			<ApplicationListElement>
				{!this.state.acceptedApplicant &&
					applications.map((application, index) => (
						<SingleApplication
							acceptApplication={this.acceptApplication.bind(this)}
							application={application}
							className="application"
							index={index}
							jobID={this.props.jobID}
							key={application.id}
						/>
					))}
				{this.state.acceptedApplicant && (
					<>
						<h1>Success!</h1>
						<p>
							We've sent
							{this.state.acceptedUser.name
								? ` ${this.state.acceptedUser.name} `
								: ` the applicant `}
							an email with your details and they'll be in touch with you as
							soon as possible!
						</p>
					</>
				)}
			</ApplicationListElement>
		);
	}
}
