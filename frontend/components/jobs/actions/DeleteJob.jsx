import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";

import { DELETE_JOB_MUTATION } from "../../mutations/job/DeleteJob";

import { ALL_JOBS_QUERY } from "../../queries/job/AllJobs";

export default class DeleteJob extends Component {
	render() {
		const { children, id, user } = this.props;

		return (
			<Mutation
				mutation={DELETE_JOB_MUTATION}
				refetchQueries={[{ query: ALL_JOBS_QUERY }]}
				variables={{ id: id }}
				update={(cache, payload) => {
					if (user.id) {
						// Change to user's page
						Router.push({
							pathname: "/user",
							query: { id: user.id }
						});
					}
				}}
			>
				{(deleteJob, { error }) => {
					return (
						<span
							onClick={() => {
								if (confirm("Are you sure you want to delete this job?")) {
									deleteJob().catch(err => {
										alert(err.message);
									});
								}
							}}
						>
							{children}
						</span>
					);
				}}
			</Mutation>
		);
	}
}
