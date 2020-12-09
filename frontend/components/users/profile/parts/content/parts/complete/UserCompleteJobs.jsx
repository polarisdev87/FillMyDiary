import React, { Component } from "react";
import moment from "moment";
import "moment/locale/en-gb";

import UserContentContainer from "../../styles/UserContentContainer";

import Link from "../../../../../../atomic/atoms/Link";

import PaginationButtons from "../../../../../styles/PaginationButtons";

export default class UserCompleteJobs extends Component {
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

		const applicationsComplete = applications.filter(
			application => application.job.stage === `JOBREVIEWED`
		);

		const appJobs = applicationsComplete.map(a => a.job);

		const jobsComplete = userJobs.filter(job => job.reviewedByOwner === true);

		const jobs = [...jobsComplete, ...appJobs];

		if (jobs && jobs.length !== 0) {
			return (
				<UserContentContainer>
					<Jobs jobs={jobs} pagination={this.props.pagination} />
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
		const { jobs, currentPage } = this.state;
		const { pagination } = this.props;

		// Logic for displaying current jobs
		const indexOfLastJob = currentPage * pagination;
		const indexOfFirstJob = indexOfLastJob - pagination;
		const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

		const numberOfPages = Math.ceil(jobs.length / pagination);

		const renderJobs = currentJobs.map((job, index) => {
			return <JobStatus job={job} index={index} key={job.id} />;
		});

		return (
			<>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Postcode</th>
							<th>Status</th>
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
	render() {
		const { job } = this.props;

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
				<td>Reviewed</td>
			</tr>
		);
	}
}
