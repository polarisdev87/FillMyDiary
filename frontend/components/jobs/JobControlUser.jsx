import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Link from "../atomic/atoms/Link";

const UsersJobElement = styled.div`
	padding: 16px 0;

	border-top: 1px solid #d9d9d9;

	h2,
	h3,
	h4 {
		margin: 0;
		font-weight: 500;
		font-style: normal;
		line-height: 1.5;
		font-size: 16px;

		color: #141213;
	}

	header {
		a {
			color: inherit;
			text-decoration: none;
		}
	}

	nav {
		margin: 8px 0;

		a {
			display: block;
			font-style: normal;
			line-height: 1.5;
			font-size: 14px;
			text-decoration: none;

			+ a {
				margin-top: 4px;
			}
		}
	}
`;

export default class JobControlUser extends Component {
	render() {
		const { index, job, stage } = this.props;

		const { id, applications, postcode, title, trades } = job;

		return (
			<UsersJobElement>
				<header>
					<Link
						href={{
							pathname: "job",
							query: { id: id }
						}}
					>
						<a>
							<h3>{postcode}</h3>
							<h4>{title}</h4>
						</a>
					</Link>
				</header>
				<nav>
					{stage === "ACCEPTEDAPPLICANT" && (
						<Link
							classList="button"
							href={{
								pathname: "applicant-info",
								query: { id: id }
							}}
						>
							<a>Applicant Contact Information</a>
						</Link>
					)}
					{stage === "CREATED" && (
						<>
							{applications.length > 0 && (
								<Link
									classList="button"
									href={{
										pathname: "applications",
										query: { id: id }
									}}
								>
									<a>Review Applications</a>
								</Link>
							)}
							<Link
								classList="button button--secondary"
								href={{
									pathname: "update",
									query: { id: id }
								}}
							>
								<a>Update Job Details</a>
							</Link>
						</>
					)}
				</nav>
			</UsersJobElement>
		);
	}
}
