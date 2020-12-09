import React, { Component } from "react";
import styled from "styled-components";

const JobExtras = styled.section`
	border-radius: 8px;
	margin-top: 32px;
	padding: 32px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
`;

export default class JobExtrasStyles extends Component {
	render() {
		return <JobExtras>{this.props.children}</JobExtras>;
	}
}
