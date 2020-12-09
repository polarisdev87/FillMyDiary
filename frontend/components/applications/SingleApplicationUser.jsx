import React, { Component } from "react";
import Head from "next/head";
import { Query } from "react-apollo";
import { Row, Col } from "react-grid-system";

import { convertDate, hidePostcode } from "../helpers";

import ContentContainer from "../styles/ContentContainer";

import DeleteApplication from "./DeleteApplication";
import SingleUserApplication from "./styles/SingleUserApplication";

import { APPLICATION_SINGLE_QUERY } from "../queries/application/ApplicationSingle";
import CurrentUser from "../queries/user/CurrentUser";

import HR from "../atomic/atoms/HR";
import Link from "../atomic/atoms/Link";

import ErrorMessage from "../atomic/molecules/ErrorMessage";
import LoaderCircle from "../atomic/molecules/loader/LoaderCircle";

import SingleLocation from "../jobs/map/Location";

const errorNoUser = {
	message: "Not logged in"
};

const errorNotYourApplication = {
	message: "This isn't your application to view 👀"
};

export default class SingleApplicationUser extends Component {
	render() {
		return (
			<Query
				fetchPolicy="network-only"
				pollInterval={60000}
				query={APPLICATION_SINGLE_QUERY}
				variables={{ id: this.props.id }}
			>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <LoaderCircle />;
					if (!data.application) return null;
					if (!data.application.user) return null;
					if (!data.application.job) return null;

					const job = data.application.job;
					const user = data.application.user;

					return (
						<CurrentUser>
							{({ data: { me } }) => {
								if (!me) {
									<ErrorMessage error={errorNoUser} />;
								}

								if (me.id !== user.id) {
									return <ErrorMessage error={errorNotYourApplication} />;
								}

								if (data.application.successful) {
									return (
										<ContentContainer>
											<SingleUserApplication>
												{error && <ErrorMessage error={error} />}
												<div className="application__title">
													<nav>
														<Link
															href={{
																pathname: "user",
																query: { id: user.id }
															}}
														>
															<a>{user.name}</a>
														</Link>
														/ Applications
														<h2 className="h3">
															Your Application Has Been Successful!
														</h2>
													</nav>
												</div>
												<SingleApplicationContent
													job={job}
													successful={data.application.successful}
												/>
											</SingleUserApplication>
										</ContentContainer>
									);
								}

								return (
									<ContentContainer>
										<SingleUserApplication>
											{error && <ErrorMessage error={error} />}
											<div className="application__title">
												<nav>
													<Link
														href={{
															pathname: "user",
															query: { id: user.id }
														}}
													>
														<a>{user.name}</a>
													</Link>
													/ Applications
													<h2 className="h3">Application is pending</h2>
												</nav>
												<DeleteApplication user={user} id={this.props.id}>
													Delete Your Application
												</DeleteApplication>
											</div>
											<SingleApplicationContent
												job={job}
												successful={data.application.successful}
											/>
										</SingleUserApplication>
									</ContentContainer>
								);
							}}
						</CurrentUser>
					);
				}}
			</Query>
		);
	}
}

class SingleApplicationContent extends Component {
	render() {
		const job = this.props.job;
		const successful = this.props.successful;

		const {
			id,
			certifications,
			days,
			description,
			endDate,
			postcode,
			price,
			stage,
			startDate,
			title,
			trades
		} = job;

		var paymentType;
		if (job.paymentType === "cash") {
			paymentType = "Cash";
		} else if (job.paymentType === "invoice") {
			paymentType = "Invoice";
		}

		const startDateObject = convertDate(startDate);
		const endDateObject = convertDate(endDate);

		const today = new Date();
		const showStartYear = startDateObject.year !== today.getFullYear();
		const showEndDate = endDateObject.year !== today.getFullYear();

		return (
			<div className="application__content">
				<Head>
					<title>Fill My Diary | {title}</title>
				</Head>
				<Row>
					<Col lg={6}>
						<h1 className="h2">
							<Link
								classList="link--inherit"
								href={{
									pathname: "job",
									query: { id: job.id }
								}}
							>
								<a>{job.title}</a>
							</Link>
						</h1>
						<h2 className="h3">
							{days} days of work at £{price} per day
						</h2>
						<p>
							Starts on the {startDateObject.day}
							{startDateObject.ordinal} of {startDateObject.monthString}
							{showStartYear && `, ${startDateObject.year}`} - Ends on the{" "}
							{endDateObject.day}
							{endDateObject.ordinal} of {endDateObject.monthString}
							{showEndDate && `, ${endDateObject.year}`}
						</p>
						<p>{job.description}</p>
						{successful ? (
							<>
								<HR size="lg" />
								<label>Email Address</label>
								<p>
									<a href={`mailto:${job.user.email}`}>{job.user.email}</a>
								</p>
								<HR size="lg" />
								<label>Telephone Number</label>
								<p>
									<a href={`tel:${job.user.telephone}`}>{job.user.telephone}</a>
								</p>
							</>
						) : null}
						<HR size="lg" />
						<label>Postcode</label>
						<p>{successful ? job.postcode : hidePostcode(job.postcode)}</p>
						<HR size="lg" />
						<label>Payment Type</label>
						<p>{paymentType}</p>
						<HR size="lg" />
						{job.additional && (
							<>
								<label>Additional Information</label>
								<p>{job.additional}</p>
								<HR size="lg" />
							</>
						)}
						{job.certifications && (
							<>
								<label>Certifications Required</label>
								<p>{job.certifications}</p>
								<HR size="lg" />
							</>
						)}
					</Col>
					<Col
						lg={5}
						offset={{
							lg: 1
						}}
					>
						<SingleLocation
							lat={20}
							lng={20}
							zoom={12}
							draggable={false}
							scrollwheel={false}
							postcode={job.postcode}
							zoom={10}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}
