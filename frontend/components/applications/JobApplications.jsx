import React, { Component } from "react";
import { Query } from "react-apollo";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";

import { APPLICATION_USERS_QUERY } from "../queries/application/ApplicationUsers";

import RestrictAreaApplicationOwner from "../atomic/particles/RestrictAreaApplicationOwner";

import LoaderCircle from "../atomic/molecules/loader/LoaderCircle";

import ApplicationsList from "./ApplicationsList";
import ApplicationsOverview from "./ApplicationsOverview";

export default class JobApplications extends Component {
	render() {
		return (
			<Query
				fetchPolicy="network-only"
				query={APPLICATION_USERS_QUERY}
				variables={{ id: this.props.id }}
			>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <LoaderCircle />;
					if (!data) return null;
					if (data.applications.length == 0)
						return (
							<Row>
								<Col lg={3}>
									<ApplicationsOverview
										applications={data.applications}
										content={this.props.content}
										id={this.props.id}
									/>
								</Col>
								<Col lg={9}>
									<ApplicationsList applications={false} complete={false} />
								</Col>
							</Row>
						);

					return (
						<RestrictAreaApplicationOwner id={data.applications[0].job.user.id}>
							<Row>
								<Col lg={3}>
									<ApplicationsOverview
										applications={data.applications}
										content={this.props.content}
										id={this.props.id}
									/>
								</Col>
								<Col lg={9}>
									{data.applications[0].job.stage !== "ACCEPTEDAPPLICANT" ? (
										<ApplicationsList
											applications={data.applications}
											complete={false}
											jobID={this.props.id}
										/>
									) : (
										<ApplicationsList applications={false} complete={true} />
									)}
								</Col>
							</Row>
						</RestrictAreaApplicationOwner>
					);
				}}
			</Query>
		);
	}
}
