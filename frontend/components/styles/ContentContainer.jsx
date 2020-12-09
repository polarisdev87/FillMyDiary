import React, { Component } from "react";
import styled from "styled-components";

const ContentContainer = styled.section`
	margin-top: 64px;
	padding: 16px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);
`;

export default class ContentContainerStyles extends Component {
	render() {
		return <ContentContainer>{this.props.children}</ContentContainer>;
	}
}
