import React, { Component } from "react";
import styled from "styled-components";

const UserContentContainer = styled.section`
	padding: 16px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);

	a {
		color: inherit;
		text-decoration: none;
	}
`;

export default class UserContentContainerStyles extends Component {
	render() {
		return <UserContentContainer>{this.props.children}</UserContentContainer>;
	}
}
