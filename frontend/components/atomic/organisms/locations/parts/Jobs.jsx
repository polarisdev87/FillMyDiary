import React, { Component } from "react";
import Link from "next/link";
import { Query } from "react-apollo";
import moment from "moment";
import styled from "styled-components";

import { JOBS_AVAILABLE_QUERY } from "../../../../queries/job/JobsAvailable";

import Job from "../../../../jobs/Job";

const JobTease = styled.div`
	border-radius: 8px;
	margin: 32px 0;
	padding: 32px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border: 1px solid
		${props => (props.theme.grey100 ? props.theme.grey100 : "#d9d9d9")};

	.job__title {
		margin: 0 0 8px;

		color: ${props => (props.theme.primary ? props.theme.primary : "#4285f4")};
		font-size: 20px;
		font-weight: bold;
		line-height: 30px;
	}
`;

export default class Jobs extends Component {
	state = {
		jobs: []
	};

	loadAllJobs = jobs => {
		this.setState({
			jobs: jobs,
			loadedAllJobs: true
		});
	};

	render() {
		return (
			<Query
				fetchPolicy="network-only"
				query={JOBS_AVAILABLE_QUERY}
				variables={{ date: moment().startOf("day") }}
			>
				{({ data, loading }) => {
					if (loading) return null;
					if (!data) {
						return (
							<>
								<h2>New Jobs Added Daily</h2>
								<div dangerouslySetInnerHTML={{ __html: this.props.content }} />
							</>
						);
					}

					if (data && this.state.loadedAllJobs !== true)
						this.loadAllJobs(data.jobs);

					return (
						<>
							<h2>
								{this.state.jobs &&
									(this.state.jobs.length > 50
										? `${this.state.jobs.length} Job Available`
										: `New Jobs Added Daily`)}
							</h2>
							<div dangerouslySetInnerHTML={{ __html: this.props.content }} />
							{this.state.jobs.map((job, index) => {
								if (index < 2) {
									return (
										<JobTease className="job" key={job.id}>
											<Link href={{ pathname: "/job", query: { id: job.id } }}>
												<a>
													<h3 className="job__title text--wrap">{job.title}</h3>
												</a>
											</Link>

											<div className="job__description">
												<p className="text--wrap">
													{job.description.replace(/(.{300})..+/, "$1...")}
												</p>
											</div>
											<Link href={{ pathname: "/job", query: { id: job.id } }}>
												<a className="button">Apply for Job</a>
											</Link>
										</JobTease>
									);
								}
							})}
						</>
					);
				}}
			</Query>
		);
	}
}
