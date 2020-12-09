import React, { Component } from "react";
import { ApolloConsumer, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import debounce from "lodash.debounce";

import { ALL_JOBS_QUERY } from "../../components/queries/job/AllJobs";
import { SEARCH_JOBS_MANAGER_QUERY } from "../../components/queries/job/SearchJobsManager";

import RestrictAreaAdmin from "../../components/atomic/particles/RestrictAreaAdmin";

import Link from "../../components/atomic/atoms/Link";

import HeaderAdmin from "../../components/header/Admin";

import JobControl from "../../components/jobs/JobControl";

const THStage = styled.th`
	.table & {
		min-width: 0px;
	}
`;

const JobManagementActions = styled.section`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin-bottom: 32px;

	.actions {
		* {
			+ * {
				margin-left: 8px;
			}
		}
	}
`;

export default class JobManagement extends Component {
	state = {
		focusedInput: null,
		jobs: [],
		initalised: false,
		loading: false,
		searching: false
	};

	onChange = debounce(async (e, client) => {
		// Turn loading on
		this.setState({ loading: true });
		// Manually query apollo client
		const res = await client.query({
			query: SEARCH_JOBS_MANAGER_QUERY,
			variables: {
				needle: e.target.value
			}
		});
		this.setState({ jobs: res.data.jobs, loading: false });
	}, 350);

	toggleSearching = e => {
		this.setState({ searching: !this.state.searching });
	};

	render() {
		return (
			<RestrictAreaAdmin>
				<>
					<HeaderAdmin />
					<JobManagementActions>
						<h1>Job Management</h1>
						<div className="actions">
							{this.state.searching && (
								<ApolloConsumer>
									{client => (
										<input
											type="search"
											onChange={e => {
												e.persist();
												this.onChange(e, client);
											}}
											placeholder="Search for a Job"
										/>
									)}
								</ApolloConsumer>
							)}
							<button onClick={this.toggleSearching}>
								{this.state.searching && "Stop"} Search
								{this.state.searching && "ing"}
							</button>
							<Link
								classList="button"
								href={{
									pathname: "/post"
								}}
							>
								<a>Add Job</a>
							</Link>
							<Link
								classList="button"
								href={{
									pathname: "add-job"
								}}
							>
								<a>Add Job on behalf of user</a>
							</Link>
						</div>
					</JobManagementActions>
					{this.state.searching && (
						<table className="table">
							<thead>
								<tr>
									<THStage className="text--center">Stage</THStage>
									<th>Title</th>
									<th>Start Date</th>
									<th>Created by</th>
									<th>Postcode</th>
									<th>Email</th>
									<th>Trade</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{this.state.jobs.length > 0 &&
									this.state.jobs.map((job, index) => (
										<JobControl
											job={job}
											user={job.user}
											index={index}
											key={job.id}
										/>
									))}
							</tbody>
						</table>
					)}
					{this.state.searching === false && (
						<Query query={ALL_JOBS_QUERY} fetchPolicy="network-only">
							{({ data, error, loading }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error: {error.message}</p>;
								if (!data) return null;
								return (
									<table className="table">
										<thead>
											<tr>
												<THStage className="text--center">Stage</THStage>
												<th>Title</th>
												<th>Start Date</th>
												<th>Created by</th>
												<th>Postcode</th>
												<th>Email</th>
												<th>Trade</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{data.jobs.map((job, index) => (
												<JobControl job={job} index={index} key={job.id} />
											))}
										</tbody>
									</table>
								);
							}}
						</Query>
					)}
				</>
			</RestrictAreaAdmin>
		);
	}
}
