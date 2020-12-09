import React, { Component } from "react";
import styled from "styled-components";

const FancyCheckboxes = styled.section`
	margin: 16px 0;

	.container {
		border-radius: 8px;
		padding: 16px;

		background-color: white;
		border: 1px solid
			${props => (props.theme.grey100 ? props.theme.grey100 : "#d9d9d9")};
	}

	input[type="checkbox"] {
		display: none;

		&:checked {
			+ label {
				background: rgba(26, 133, 255, 0.1);
				border: 1px solid
					${props => (props.theme.blue600 ? props.theme.blue600 : "#006be6")};
				color: ${props =>
					props.theme.blue600 ? props.theme.blue600 : "#006be6"};
			}
		}
	}

	label {
		border-radius: 8px;
		padding: 8px;

		border: 1px solid transparent;
		cursor: pointer;
		transition: 0.2s all ease;

		&:hover {
			background: rgba(26, 133, 255, 0.1);
			border: 1px solid
				${props => (props.theme.blue600 ? props.theme.blue600 : "#006be6")};
			color: ${props =>
				props.theme.blue600 ? props.theme.blue600 : "#006be6"};
		}
	}
`;

export default class FancyCheckboxesStyles extends Component {
	render() {
		return <FancyCheckboxes>{this.props.children}</FancyCheckboxes>;
	}
}
