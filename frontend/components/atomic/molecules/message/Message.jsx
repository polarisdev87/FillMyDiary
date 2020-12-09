import React, { Component } from "react";
import styled from "styled-components";

export default class Message extends Component {
	render() {
		const { type } = this.props;

		const MessageElement = styled.nav`
			margin: 16px 0;
			padding: 16px;

			background: ${props =>
				props.theme.grey100 ? props.theme.grey100 : "#f2f4f8"};
			border: 1px solid
				${props => (props.theme.grey200 ? props.theme.grey200 : "#f2f4f8")};
			color: ${props => (props.theme.black ? props.theme.black : "#f2f4f8")};

			a {
				text-transform: capitalize;
				text-decoration: none;
			}

			p:last-of-type {
				margin-bottom: 0;
			}
		`;

		return (
			<MessageElement className={`message message--${type}`}>
				{this.props.children}
			</MessageElement>
		);
	}
}
