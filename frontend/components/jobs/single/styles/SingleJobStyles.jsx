import React, { Component } from "react";
import styled from "styled-components";

const JobDetails = styled.section`
	border-radius: 8px;
	margin-top: 32px;
	padding: 32px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};

	h1 {
		font-size: 40px;
	}

	h2 {
		font-size: 24px;
	}

	nav {
		a {
			color: inherit;
			text-decoration: none;
		}

		span {
			&:before {
				content: "/";
				margin: 0 4px;
			}
		}
	}

	.button + .button {
		margin-left: 8px;
	}
`;

export default class SingleJobStyles extends Component {
	render() {
		return <JobDetails>{this.props.children}</JobDetails>;
	}
}
