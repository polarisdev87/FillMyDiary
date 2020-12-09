import React, { Component } from "react";
import Head from "next/head";
import { Query } from "react-apollo";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/en-gb";

import { applicationsPerDay } from "../../../config";

import { hidePostcode } from "../../helpers";

import { SINGLE_JOB_QUERY } from "../../queries/job/JobSingle";

import CreateApplication from "../../applications/CreateApplication";

import Link from "../../atomic/atoms/Link";
import HR from "../../atomic/atoms/HR";

import Error from "../../atomic/molecules/ErrorMessage";
import LoaderCircle from "../../atomic/molecules/loader/LoaderCircle";

import SingleLocation from "../map/Location";
import JobExtras from "../styles/JobExtras";
import SingleJobStyles from "./styles/SingleJobStyles";

const hideStages = ["ACCEPTEDAPPLICANT", "JOBCOMPLETE", "JOBREVIEWED"];
const today = moment().format("YYYY-MM-DD");

export default class SingleJob extends Component {
	render() {
		return (
			<Query
				fetchPolicy="network-only"
				query={SINGLE_JOB_QUERY}
				variables={{ id: this.props.id }}
			>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <LoaderCircle />;
					if (!data.job) return <p>No Item Found for {this.props.id}</p>;

					const job = data.job;

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

					const trade = trades[0].name;

					var paymentType;
					if (job.paymentType === "cash") {
						paymentType = "Cash";
					} else if (job.paymentType === "invoice") {
						paymentType = "Invoice";
					}

					return (
						<>
							<Head>
								<title>Fill My Diary | {title}</title>
							</Head>
							<Row>
								<Col lg={6}>
									<SingleJobStyles>
										<nav>
											<Link href="/search">
												<a>Jobs</a>
											</Link>
											<span>{trade}</span>
										</nav>
										<h1>{job.title}</h1>
										<h2 className="h3">
											{days} days of work at £{price} per day
										</h2>
										<p>
											Starts on the{` `}
											{moment(startDate).format("Do MMMM YYYY")}
											{` `}- Ends on the{` `}
											{moment(endDate).format("Do MMMM YYYY")}
										</p>
										<p className="text--wrap">{job.description}</p>
										<HR size="lg" />
										<label>Postcode</label>
										<p>{hidePostcode(job.postcode)}</p>
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
										<JobApply job={job} me={this.props.me} />
									</SingleJobStyles>
								</Col>

								<Col lg={6}>
									<JobExtras>
										<SingleLocation
											lat={20}
											lng={20}
											zoom={12}
											draggable={false}
											scrollwheel={false}
											postcode={job.postcode}
											latitude={job.latitude}
											longitude={job.longitude}
											zoom={10}
										/>
									</JobExtras>
								</Col>
							</Row>
						</>
					);
				}}
			</Query>
		);
	}
}

class JobApply extends Component {
	limitApplications(applications) {
		const todaysApplications = applications.filter(
			app => today === moment(app.createdAt).format("YYYY-MM-DD")
		);

		if (todaysApplications === undefined || todaysApplications.length == 0)
			return true;

		return todaysApplications.length <= applicationsPerDay ? true : false;
	}

	render() {
		const { job, me } = this.props;

		if (!me) {
			return (
				<Link
					classList="button"
					href={{
						pathname: "/register"
					}}
				>
					<a>Create An Account To Apply</a>
				</Link>
			);
		}

		if (!me.approved) {
			return <button disabled>Account is awaiting approval</button>;
		}

		if (job.user.id === me.id) {
			return (
				<>
					<Link
						classList="button"
						href={{
							pathname: "/update",
							query: { id: job.id }
						}}
					>
						<a>Update Your Job</a>
					</Link>
					<Link
						classList="button"
						href={{
							pathname: "/applications",
							query: { id: job.id }
						}}
					>
						<a>View Applicants</a>
					</Link>
				</>
			);
		}

		if (job.applications.some(e => e.user.id === me.id)) {
			return (
				<button disabled={true}>You've already applied for this job</button>
			);
		}

		// Lock Ground Workers and Labourers out of jobs which are not within their trades
		if (
			me.trades.some(
				trade => trade.slug === `ground` || trade.slug === `labourer`
			)
		) {
			if (
				job.trades.some(
					trade => trade.slug !== `ground` && trade.slug !== `labourer`
				)
			) {
				return <button disabled={true}>Job not within profile trades</button>;
			}
		}

		// If job falls under a specific stage, remove the ability to create an application
		const showApply =
			hideStages.indexOf(job.stage) === -1 && me.id !== job.user.id;

		// If no applications are found for this job and the user has made less than 3 applications today then show the apply button
		if (
			!me.applications ||
			((me.applications === undefined || me.applications.length == 0) &&
				showApply)
		)
			return <CreateApplication job={job} user={me} />;

		// If there are applications, check the limit of applications and ensure the user hasn't already applied for this job
		if (
			me.applications &&
			showApply &&
			this.limitApplications(me.applications)
		) {
			return <CreateApplication job={job} user={me} />;
		}

		return null;
	}
}
