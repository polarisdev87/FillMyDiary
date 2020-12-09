import React, { Component } from "react";
import styled from "styled-components";

import Link from "../atoms/Link";

const BreadCrumbsElement = styled.nav`
	padding: 16px;

	background-color: ${props =>
		props.theme.offWhite ? props.theme.offWhite : "#f2f4f8"};

	a {
		text-transform: capitalize;
		text-decoration: none;
	}

	li {
		display: inline-block;

		.link--unavailable {
			color: inherit;
		}

		&:after {
			content: "/";
			margin-left: 4px;
		}

		+ li {
			margin-left: 4px;
		}
	}

	ul {
		margin: 0;
		padding: 0;

		list-style: none;
	}
`;

export default class Breadcrumbs extends Component {
	render() {
		const { menuObject } = this.props;

		if (menuObject) {
			return (
				<BreadCrumbsElement>
					<ul>
						{menuObject &&
							menuObject.map((item, index) => {
								return (
									<li key={`breadcrumb-item-${index}`}>
										<Link
											href={item.url}
											classList={
												item.url ? "link--available" : "link--unavailable"
											}
										>
											<a>{item.title}</a>
										</Link>
									</li>
								);
							})}
					</ul>
				</BreadCrumbsElement>
			);
		}

		return null;
	}
}
