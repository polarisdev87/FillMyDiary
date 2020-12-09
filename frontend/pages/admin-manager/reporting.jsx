import React, { Component } from "react";
import { Query } from "react-apollo";

import RestrictAreaAdmin from "../../components/atomic/particles/RestrictAreaAdmin";

import HR from "../../components/atomic/atoms/HR";

import ErrorMessage from "../../components/atomic/molecules/ErrorMessage";

import HeaderAdmin from "../../components/header/Admin";

import LineChartElement from "../../components/admin/charts/line";

import { ALL_APPLICATIONS_QUERY } from "../../components/queries/application/AllApplications";
import { ALL_JOBS_QUERY } from "../../components/queries/job/AllJobs";
import { ALL_REVIEWS_QUERY } from "../../components/queries/review/AllReviews";
import { ALL_USERS_QUERY } from "../../components/queries/user/AllUsers";

export default class Reporting extends Component {
	render() {
		return (
			<RestrictAreaAdmin>
				<HeaderAdmin />
				<h1>Reporting</h1>
				<HR />
				<Query query={ALL_USERS_QUERY}>
					{({ data, loading, error }) => {
						if (loading) return null;
						if (error) return <ErrorMessage error={error} />;
						return (
							<LineChartElement
								id="chartUsers"
								data={data.users}
								title="User Accounts"
								yLabel="User Count"
							/>
						);
					}}
				</Query>
				<HR />
				<Query query={ALL_JOBS_QUERY}>
					{({ data, loading, error }) => {
						if (loading) return null;
						if (error) return <ErrorMessage error={error} />;
						return (
							<LineChartElement
								id="chartJobs"
								data={data.jobs}
								title="Jobs Created"
								yLabel="Job Count"
							/>
						);
					}}
				</Query>
				<HR />
				<Query query={ALL_APPLICATIONS_QUERY}>
					{({ data, loading, error }) => {
						if (loading) return null;
						if (error) return <ErrorMessage error={error} />;
						return (
							<LineChartElement
								id="chartApplications"
								data={data.applications}
								title="Applications Created"
								yLabel="Application Count"
							/>
						);
					}}
				</Query>
				<HR />
				<Query query={ALL_REVIEWS_QUERY}>
					{({ data, loading, error }) => {
						if (loading) return null;
						if (error) return <ErrorMessage error={error} />;
						return (
							<LineChartElement
								id="chartReviews"
								data={data.reviews}
								title="Reviews Created"
								yLabel="Review Count"
							/>
						);
					}}
				</Query>
				<HR />
			</RestrictAreaAdmin>
		);
	}
}
