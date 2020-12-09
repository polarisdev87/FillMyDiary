import React, { Component } from "react";
import { Query } from "react-apollo";

import { SEARCH_JOBS_BROWSE_QUERY } from "../../queries/job/SearchJobsBrowse";

import Job from "../../jobs/Job";
import NoJobsFound from "./NoJobsFound";

import ErrorMessage from "../../atomic/molecules/ErrorMessage";
import LoaderCircle from "../../atomic/molecules/loader/LoaderCircle";

export default class JobResults extends Component {
	render() {
		const {
			date,
			jobs,
			loading,
			loadedAllJobs,
			price,
			setInitialTrade,
			trade
		} = this.props;

		if (!loadedAllJobs && setInitialTrade) {
			return (
				<Query
					query={SEARCH_JOBS_BROWSE_QUERY}
					fetchPolicy="network-only"
					variables={{
						date: date,
						price: price,
						trade: trade
					}}
				>
					{({ data, error, loading }) => {
						if (loading) return <LoaderCircle />;
						if (error) return <ErrorMessage error={error} />;
						if (!data) return null;
						this.props.loadAllJobs(data.jobs);
						return null;
					}}
				</Query>
			);
		}

		if (!jobs || jobs.length === 0) {
			return (
				<section>
					<NoJobsFound />
				</section>
			);
		}

		return jobs.map((job, index) => (
			<Job job={job} index={index} key={job.id} />
		));

		return null;
	}
}
