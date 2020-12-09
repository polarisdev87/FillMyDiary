import React, { Component } from "react";
import { Query } from "react-apollo";
import moment from "moment";
import "moment/locale/en-gb";

import Job from "../../../../../../jobs/Job";

import ErrorMessage from "../../../../../../atomic/molecules/ErrorMessage";

import { USER_AVAILABLE_JOBS_QUERY } from "../../../../../../queries/job/UserAvailableJobs";

export default class UserAvailableJobs extends Component {
	render() {
		const { user } = this.props;
		const today = moment().startOf("day");
		const userTrades = user.trades.map(trade => trade.id);

		const variables = {
			date: today,
			id: user.id,
			trades: userTrades
		};

		return (
			<Query
				fetchPolicy="network-only"
				query={USER_AVAILABLE_JOBS_QUERY}
				variables={variables}
			>
				{({ data, error, loading }) => {
					if (error) return <ErrorMessage error={error} />;
					if (!data) return null;
					if (!data.jobs) return null;
					return (
						<>
							{data.jobs.map((job, index) => (
								<Job job={job} index={index} key={job.id} />
							))}
						</>
					);
				}}
			</Query>
		);
	}
}
