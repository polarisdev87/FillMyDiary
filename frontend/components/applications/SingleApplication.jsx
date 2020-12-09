import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Row, Col } from "react-grid-system";

import IconCheckCircle from "../../assets/icons/fa/check-circle.svg";

import SingleUserApplication from "./styles/SingleUserApplication";

import { APPROVE_APPLICAITON_USER_MUTATION } from "../mutations/application/ApproveApplication";

import ErrorMessage from "../atomic/molecules/ErrorMessage";

export default class SingleApplication extends Component {
	state = {
		approved: false
	};

	handleApprovalChange = e => {
		this.props.acceptApplication(this.props.application.user);
		this.setState({ approved: true });
	};

	render() {
		const application = this.props.application;

		// Create a general information object from the user object
		const applicantBio = (({ businessName, certifications, referenceOne }) => ({
			businessName,
			certifications,
			referenceOne
		}))(application.user);

		// Create a contact information object from the user object
		const applicantContact = (({ city, email, telephone, town, website }) => ({
			city,
			email,
			telephone,
			town,
			website
		}))(application.user);

		return (
			<Mutation
				mutation={APPROVE_APPLICAITON_USER_MUTATION}
				variables={{
					id: application.id,
					job: this.props.jobID,
					user: application.user.id
				}}
				update={this.handleApprovalChange}
			>
				{(acceptApplication, { loading, error }) => (
					<SingleUserApplication>
						{error && <ErrorMessage error={error} />}
						<Row>
							<Col lg={12}>
								<h2 className="application__title">{application.user.name}</h2>
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
								{application.user.manualReferences && (
									<p className="user__approved" title="Manually Approved">
										Fill My Diary Verified
										<IconCheckCircle />
									</p>
								)}
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
						{this.state.approved === false ? (
							<button
								type="button"
								disabled={loading}
								onClick={acceptApplication}
							>
								Accept{loading ? "ing" : null} User
							</button>
						) : (
							<button type="button" disabled={true}>
								Accepted User
							</button>
						)}
					</SingleUserApplication>
				)}
			</Mutation>
		);
	}
}

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
