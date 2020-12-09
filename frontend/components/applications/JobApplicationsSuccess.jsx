import React, { Component } from "react";
import { Query } from "react-apollo";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";

import SingleUserApplication from "./styles/SingleUserApplication";

import { USER_APPLICATIONS_SUCCESSFUL_QUERY } from "../queries/application/UserApplicationsSuccessful";

import ApplicationsOverview from "./ApplicationsOverview";

import LoaderCircle from "../atomic/molecules/loader/LoaderCircle";

const ApplicationListElement = styled.section`
	margin-top: 64px;
	padding: 32px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);
`;

class ProfileInfo extends Component {
	render() {
		var ProfileInfoElement;

		this.props.value.startsWith("https://")
			? (ProfileInfoElement = (
					<>
						<label>{this.props.label}</label>
						<a href={this.props.value} target="_blank">
							{this.props.value}
						</a>
					</>
			  ))
			: (ProfileInfoElement = (
					<>
						<label>{this.props.label}</label>
						<p>{this.props.value}</p>
					</>
			  ));

		return ProfileInfoElement;
	}
}

export default class JobApplicationsSuccess extends Component {
	render() {
		return (
			<Query
				fetchPolicy="network-only"
				query={USER_APPLICATIONS_SUCCESSFUL_QUERY}
				variables={{ id: this.props.id }}
			>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <LoaderCircle />;
					if (!data.applications || data.applications.length === 0)
						return <p>No applications found for your job</p>;

					const application = data.applications[0];

					// Create a general information object from the user object
					const applicantBio = (({
						businessName,
						certifications,
						referenceOne
					}) => ({
						businessName,
						certifications,
						referenceOne
					}))(application.user);

					// Create a contact information object from the user object
					const applicantContact = (({
						city,
						email,
						telephone,
						town,
						website
					}) => ({ city, email, telephone, town, website }))(application.user);

					return (
						<React.Fragment>
							<Row>
								<Col lg={3}>
									<ApplicationsOverview
										applications={application}
										content={this.props.content}
										id={this.props.id}
										successful={true}
									/>
								</Col>
								<Col lg={9}>
									<ApplicationListElement>
										<SingleUserApplication>
											<Row>
												<Col lg={12}>
													<h2 className="application__title">
														You've chosen {application.user.name} 👷‍
													</h2>
												</Col>
												<Col lg={5}>
													{Object.keys(applicantBio).map((key, index) => {
														return typeof applicantBio[key] === "number" ||
															(typeof applicantBio[key] === "string" &&
																applicantBio[key] !== "") ? (
															<ProfileInfo
																label={key}
																key={key}
																value={applicantBio[key]}
															/>
														) : null;
													})}
												</Col>
												<Col
													lg={5}
													offset={{
														lg: 1
													}}
												>
													{Object.keys(applicantContact).map((key, index) => {
														return typeof applicantContact[key] === "number" ||
															(typeof applicantContact[key] === "string" &&
																applicantContact[key] !== "") ? (
															<ProfileInfo
																label={key}
																key={key}
																value={applicantContact[key]}
															/>
														) : null;
													})}
												</Col>
											</Row>
										</SingleUserApplication>
									</ApplicationListElement>
								</Col>
							</Row>
						</React.Fragment>
					);
				}}
			</Query>
		);
	}
}
