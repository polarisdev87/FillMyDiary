import React, { Component } from "react";
import moment from "moment";
import "moment/locale/en-gb";

import UserContentContainer from "../../styles/UserContentContainer";

import DeleteJob from "../../../../../../jobs/actions/DeleteJob";

import Link from "../../../../../../atomic/atoms/Link";

import PaginationButtons from "../../../../../styles/PaginationButtons";

export default class UserCreatedJobs extends Component {
	render() {
		const { user } = this.props;

		if (!user.jobs || user.jobs.length === 0) {
			return (
				<UserContentContainer>
					<p>Your jobs will show here when you create them.</p>
					<p>
						<Link
							href={{
								pathname: "post"
							}}
						>
							<a>Click here to create a job</a>
						</Link>
						{` `}
						or go to 'Create Job' in the navigation.
					</p>
				</UserContentContainer>
			);
		}

		return (
			<UserContentContainer>
				<Jobs jobs={user.jobs} user={user} pagination={this.props.pagination} />
			</UserContentContainer>
		);
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
		const { pagination } = this.props;

		const orderedJobs = jobs.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});

		// Logic for displaying current jobs
		const indexOfLastJob = currentPage * pagination;
		const indexOfFirstJob = indexOfLastJob - pagination;
		const currentJobs = orderedJobs.slice(indexOfFirstJob, indexOfLastJob);

		const numberOfPages = Math.ceil(orderedJobs.length / pagination);

		const renderJobs = currentJobs.map((job, index) => {
			return (
				<JobStatus
					job={job}
					index={index}
					key={job.id}
					user={this.props.user}
				/>
			);
		});

		return (
			<>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Postcode</th>
							<th>Status</th>
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
							Previous
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
							Next
						</button>
					</PaginationButtons>
				)}
			</>
		);
	}
}

class JobStatus extends Component {
	render() {
		const { job, user } = this.props;

		const statuses = [
			{
				slug: `ACCEPTEDAPPLICANT`,
				value: `Accepted Applicant`
			},
			{
				slug: `CREATED`,
				value: `Created`
			},
			{
				slug: `EXPIRED`,
				value: `Expired`
			},
			{
				slug: `JOBREVIEWED`,
				value: `Reviewed`
			},
			{
				slug: `OUTSTANDING`,
				value: `Outstanding Payment`
			},
			{
				slug: `RECIEVEDAPPLICATION`,
				value: `Recieved Applicant(s)`
			}
		];

		const status = statuses.filter(status => {
			return status.slug === job.stage;
		});

		if (job.stage === `ACCEPTEDAPPLICANT`) return null;
		if (job.stage === `JOBREVIEWED`) return null;

		const friendlyStatus = status.length > 0 ? status[0].value : job.stage;

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
				<td>{friendlyStatus}</td>
				<td className="table__actions">
					{(job.stage === `CREATED` || job.stage === `RECIEVEDAPPLICATION`) && (
						<Link
							href={{
								pathname: "job",
								query: { id: job.id }
							}}
						>
							<a>Manage</a>
						</Link>
					)}
					{job.stage !== `EXPIRED` && job.stage !== `OUTSTANDING` ? (
						<Link
							href={{
								pathname: "applications",
								query: { id: job.id }
							}}
						>
							<a>Applications</a>
						</Link>
					) : (
						`Actions Unavailable`
					)}
					{job.stage === `CREATED` && (
						<button className="button--inline">
							<DeleteJob id={job.id} user={user}>
								Delete
							</DeleteJob>
						</button>
					)}
				</td>
			</tr>
		);
	}
}
