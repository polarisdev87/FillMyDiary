import React, { Component } from "react";
import gql from "graphql-tag";
import Head from "next/head";
import { Query } from "react-apollo";
import { Container, Row, Col } from "react-grid-system";
import styled, { ThemeProvider } from "styled-components";

import Link from "../atoms/Link";

import LoaderCircle from "./loader/LoaderCircle";

import { perPage } from "../../config";

const PaginationElement = styled.nav`
	align-items: center;
	display: flex;
	justify-content: center;
	margin: 0 auto;

	a {
		text-decoration: none;
	}

	a[aria-disabled="true"] {
		color: currentColor;
		cursor: not-allowed;
		opacity: 0.5;
		display: inline-block; /* For IE11/ MS Edge bug */
		pointer-events: none;
		text-decoration: none;
	}

	.pagination__current {
		margin: 0 16px;
	}
`;

const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		jobsConnection {
			aggregate {
				count
			}
		}
	}
`;

export default class Pagination extends Component {
	render() {
		return (
			<Query fetchPolicy="network-only" query={PAGINATION_QUERY}>
				{({ data, loading, error }) => {
					if (loading) return <LoaderCircle />;
					const count = data.jobsConnection.aggregate.count;
					const pages = Math.ceil(count / perPage);
					const page = this.props.page;
					return (
						<React.Fragment>
							<Head>
								<title>
									Fill My Diary | Page {page} of {pages}
								</title>
							</Head>
							<PaginationElement className="pagination">
								<Link
									href={{
										pathname: "jobs",
										query: { page: page - 1 }
									}}
									prefetch
								>
									<a className="pagination__previous" aria-disabled={page <= 1}>
										Previous
									</a>
								</Link>
								<span className="pagination__current">
									Page {page} of {pages}
								</span>
								<Link
									href={{
										pathname: "jobs",
										query: { page: page + 1 }
									}}
									prefetch
								>
									<a className="pagination__next" aria-disabled={page >= pages}>
										Next
									</a>
								</Link>
							</PaginationElement>
						</React.Fragment>
					);
				}}
			</Query>
		);
	}
}
