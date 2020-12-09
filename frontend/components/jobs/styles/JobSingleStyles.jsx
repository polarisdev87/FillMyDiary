import React, { Component } from "react";
import styled from "styled-components";

const SingleJobElement = styled.div`
	border-radius: 8px;
	display: flex;
	margin: 0 0 32px;
	padding: 32px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border: 1px solid
		${props => (props.theme.grey100 ? props.theme.grey100 : "#d9d9d9")};

	ul {
		padding-left: 16px;
	}

	+ .job {
		margin: 32px 0;
	}

	.job__actions {
		display: flex;
		margin-top: 8px;
	}

	.job__details {
		display: flex;
		flex-direction: column;
		width: 100%;

		font-style: normal;
		font-weight: normal;
		line-height: 21px;
		font-size: 14px;

		color: ${props => (props.theme.black ? props.theme.black : "#141213")};

		a {
			text-decoration: none;
		}
	}

	.job__header {
		align-items: flex-start;
		display: flex;
		justify-content: space-between;

		svg {
			height: 24px;
		}
	}

	.job__subtitle {
		margin: 0 0 24px;

		color: ${props => (props.theme.black ? props.theme.black : "#141213")};
		font-size: 14px;
		font-weight: 500;
		line-height: 21px;
	}

	.job__title {
		margin: 0;

		color: ${props => (props.theme.primary ? props.theme.primary : "#4285f4")};
		font-size: 20px;
		font-weight: bold;
		line-height: 30px;
	}

	.job__toggle--active {
		transform: rotate(-180deg);
	}
`;

export default class JobSingleStyles extends Component {
	render() {
		return <SingleJobElement>{this.props.children}</SingleJobElement>;
	}
}
