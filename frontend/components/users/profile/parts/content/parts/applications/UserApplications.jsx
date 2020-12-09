import React, { Component } from "react";
import styled from "styled-components";

import { profileStatusPagination } from "../../../../../../../config";
import { groupBy, hidePostcode } from "../../../../../../helpers";

import UserContentContainer from "../../styles/UserContentContainer";

import Link from "../../../../../../atomic/atoms/Link";

import ErrorMessage from "../../../../../../atomic/molecules/ErrorMessage";

import PaginationButtons from "../../../../../styles/PaginationButtons";
import UserApplicationStatus from "../../../../../styles/UserApplicationStatus";

export default class UsersCreatedJobs extends Component {
	render() {
		const { user } = this.props;

		const applications = user.applications;

		if (!applications) {
			return (
				<UserContentContainer>
					Your applications will show here when you apply for jobs.
				</UserContentContainer>
			);
		}

		return (
			<UserContentContainer>
				<Applications
					applications={applications}
					pagination={this.props.pagination}
				/>
			</UserContentContainer>
		);
	}
}

class Applications extends Component {
	state = {
		applications: this.props.applications,
		currentPage: 1
	};

	deductPage = e => {
		this.setState({ currentPage: this.state.currentPage - 1 });
	};

	incrementPage = e => {
		this.setState({ currentPage: this.state.currentPage + 1 });
	};

	render() {
		const { applications, currentPage } = this.state;
		const { pagination } = this.props;

		const orderedApplications = applications.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});

		// Logic for displaying current applications
		const indexOfLastApplication = currentPage * pagination;
		const indexOfFirstApplication = indexOfLastApplication - pagination;
		const currentApplications = orderedApplications.slice(
			indexOfFirstApplication,
			indexOfLastApplication
		);

		const numberOfPages = Math.ceil(orderedApplications.length / pagination);

		return (
			<>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Open To Applicants</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentApplications.map((application, index) => (
							<ApplicationStatus
								application={application}
								index={index}
								key={application.id}
							/>
						))}
					</tbody>
				</table>
				{applications.length > pagination && (
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

class ApplicationStatus extends Component {
	render() {
		const { application } = this.props;

		return (
			<tr>
				<td>
					<Link
						href={{
							pathname: "application",
							query: { id: application.id }
						}}
					>
						<a>{application.job.title}</a>
					</Link>
				</td>
				<td>{application.open ? `Open` : `Closed`}</td>
				<td>
					{application.open
						? `Pending`
						: application.successful
						? `Successful`
						: `Unsuccessful`}
				</td>
				<td className="table__actions">
					<Link
						href={{
							pathname: "application",
							query: { id: application.id }
						}}
					>
						<a>Manage</a>
					</Link>
					<Link
						href={{
							pathname: "job",
							query: { id: application.job.id }
						}}
					>
						<a>View Job</a>
					</Link>
				</td>
			</tr>
		);
	}
}
