import React, { Component } from "react";
import styled from "styled-components";

const UserJobsContainer = styled.aside`
	margin-top: 64px;
	padding: 16px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);

	.title {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;

		h2 {
			margin: 0;
			font-weight: 500;
			font-style: normal;
			line-height: 21px;
			font-size: 14px;

			color: #141213;
		}
	}
`;

export default class UserJobsContainerStyles extends Component {
	render() {
		return <UserJobsContainer>{this.props.children}</UserJobsContainer>;
	}
}
