import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/en-gb";

import UserContentContainer from "../../styles/UserContentContainer";

import Link from "../../../../../../atomic/atoms/Link";

import PaginationButtons from "../../../../../styles/PaginationButtons";

import ReviewForm from "./parts/ReviewForm";

export default class UserJobsToReview extends Component {
	state = {
		setNotifications: false
	};

	render() {
		const { user } = this.props;

		if (
			(!user.applications || user.applications.length === 0) &&
			(!user.jobs || user.jobs.length === 0)
		)
			return null;

		const applications = user.applications;
		const userJobs = user.jobs;

		const applicationsSuccessful = applications.filter(
			application => application.successful === true
		);

		const applicationsToIncompleteReview = applicationsSuccessful.filter(
			application =>
				application.job.stage !== `JOBREVIEWED` &&
				application.job.reviewedByWorker === false
		);

		const applicationsToReview = applicationsToIncompleteReview.filter(
			application =>
				moment(application.job.endDate).format("YYYY/MM/DD") <
				moment().format("YYYY/MM/DD")
		);

		const appJobs = applicationsToReview.map(app => app.job);

		const jobsAccepted = userJobs.filter(
			job => job.stage === `ACCEPTEDAPPLICANT` && job.reviewedByOwner === false
		);

		const jobsToReview = jobsAccepted.filter(
			job =>
				moment(job.endDate).format("YYYY/MM/DD") < moment().format("YYYY/MM/DD")
		);

		const jobs = [...jobsToReview, ...appJobs];

		if (jobs && jobs.length !== 0) {
			return (
				<UserContentContainer>
					<Jobs jobs={jobs} pagination={this.props.pagination} user={user} />
				</UserContentContainer>
			);
		}

		return null;
	}
}

class Jobs extends Component {
	state = {
		jobs: this.props.jobs,
		currentPage: 1
	};

	deductPage = e => {
		this.setState({ currentPage: this.state.currentPage - 1 });
	};

	incrementPage = e => {
		this.setState({ currentPage: this.state.currentPage + 1 });
	};

	render() {
		const { jobs, currentPage, itemsPerPage } = this.state;
		const { pagination, user } = this.props;

		// Logic for displaying current jobs
		const indexOfLastJob = currentPage * pagination;
		const indexOfFirstJob = indexOfLastJob - pagination;
		const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

		const numberOfPages = Math.ceil(jobs.length / pagination);

		const renderJobs = currentJobs.map((job, index) => {
			return <JobStatus job={job} index={index} key={job.id} user={user} />;
		});

		return (
			<>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Postcode</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{renderJobs}</tbody>
				</table>
				{jobs.length > pagination && (
					<PaginationButtons>
						<button
							disabled={this.state.currentPage <= 1}
							onClick={this.deductPage}
						>
							Latest
						</button>
						{[...Array(numberOfPages)].map((x, i) => {
							return (
								<button
									className={
										currentPage === i + 1
											? `button--number button--active`
											: `button--number`
									}
									onClick={() => {
										this.setState({ currentPage: i + 1 });
									}}
								>
									{i + 1}
								</button>
							);
						})}
						<button
							disabled={this.state.currentPage === numberOfPages}
							onClick={this.incrementPage}
						>
							Older
						</button>
					</PaginationButtons>
				)}
			</>
		);
	}
}

class JobStatus extends Component {
	state = {
		reviewing: false
	};

	toggleReviewing = e => {
		if (e) e.preventDefault();
		this.setState({ reviewing: !this.state.reviewing });
	};

	render() {
		const { job, user } = this.props;

		return (
			<tr>
				<td>
					<Link
						href={{
							pathname: "job",
							query: { id: job.id }
						}}
					>
						<a>{job.title}</a>
					</Link>
				</td>
				<td>{job.postcode}</td>
				<td>{moment(job.startDate).format("DD/MM/YYYY")}</td>
				<td>{moment(job.endDate).format("DD/MM/YYYY")}</td>
				<td>
					<button onClick={e => this.toggleReviewing(e)}>Leave a Review</button>
					<ReviewForm
						job={job}
						reviewing={this.state.reviewing}
						toggleReviewing={this.toggleReviewing}
						type={job.price !== undefined ? `Builder` : `Tradesmen`}
						user={user}
					/>
				</td>
			</tr>
		);
	}
}
