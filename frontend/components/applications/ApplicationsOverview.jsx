import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/en-gb";

import { APPLICATION_JOB_QUERY } from "../queries/application/ApplicationJob";

import Link from "../atomic/atoms/Link";
import HR from "../atomic/atoms/HR";

import Error from "../atomic/molecules/ErrorMessage";
import LoaderCircle from "../atomic/molecules/loader/LoaderCircle";

const ApplicationsOverviewElement = styled.section`
	margin-top: 64px;
	padding: 32px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);

	a {
		text-decoration: none;
	}

	h1 {
		margin-top: 0;
	}

	h1,
	h2 {
		font-size: 32px;
	}

	h3,
	h4 {
		font-size: 24px;
	}
`;

export default class ApplicationsOverview extends Component {
	createMarkup(content) {
		return { __html: content };
	}

	hidePostcode(postcode) {
		if (postcode) {
			postcode = postcode.substring(0, postcode.length - 3);
			postcode += "***";
		}
		return postcode;
	}

	render() {
		const { index, applications } = this.props;

		return (
			<ApplicationsOverviewElement>
				<>
					<h1 className="h2">
						{this.props.content && this.props.content["heading_one"].value}
					</h1>
					{this.props.content && (
						<p
							dangerouslySetInnerHTML={this.createMarkup(
								this.props.content["paragraph_one"].value
							)}
						/>
					)}
					<HR size="lg" />
					<h2>Job Overview</h2>
					<Query
						fetchPolicy="network-only"
						query={APPLICATION_JOB_QUERY}
						variables={{ id: this.props.id }}
					>
						{({ error, loading, data }) => {
							if (error) return <Error error={error} />;
							if (loading) return <LoaderCircle />;
							if (!data.job) return <p>No job found for {this.props.id}</p>;

							const job = data.job;

							const {
								id,
								certifications,
								coupon,
								days,
								description,
								endDate,
								postcode,
								price,
								startDate,
								title,
								trades
							} = job;

							var paymentType;
							if (job.paymentType === "cash") {
								paymentType = "Cash";
							} else if (job.paymentType === "invoice") {
								paymentType = "Invoice";
							}

							return (
								<>
									<p>
										<Link
											href={{
												pathname: "job",
												query: { id: this.props.id }
											}}
										>
											<a>{job.title}</a>
										</Link>
									</p>
									<p>
										{days} days of work at £{price} per day
									</p>
									<p>
										Starts on the{` `}
										{moment(startDate).format("Do MMMM YYYY")}
										{` `}- Ends on the{` `}
										{moment(endDate).format("Do MMMM YYYY")}
									</p>
									<HR size="lg" />
									<label>Postcode</label>
									<p>{this.hidePostcode(job.postcode)}</p>
									<HR size="lg" />
									<label>Payment Type</label>
									<p>{paymentType}</p>
									<HR size="lg" />
									{job.certifications && (
										<>
											<label>Certifications Required</label>
											<p>{job.certifications}</p>
											<HR size="lg" />
										</>
									)}
								</>
							);
						}}
					</Query>
				</>
			</ApplicationsOverviewElement>
		);
	}
}
