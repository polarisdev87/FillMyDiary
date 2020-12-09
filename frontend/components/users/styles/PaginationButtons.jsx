import React, { Component } from "react";
import styled from "styled-components";

const PaginationButtons = styled.nav`
	display: flex;
	margin-top: 32px;

	button {
		padding: 16px;
		margin: 0;
		min-width: 0px;

		font-size: 16px;
		font-weight: 400;

		&:first-of-type {
			border-radius: 3px 0 0 3px;
		}

		&:last-of-type {
			border-radius: 0 3px 3px 0;
		}
	}

	.button--number {
		border-radius: inherit;
		display: inherit;
		padding: 0 12px;
		background: inherit;
		border: inherit;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
		letter-spacing: inherit;
		line-height: inherit;
		outline: inherit;
		text-align: inherit;
		text-decoration: inherit;
		text-transform: inherit;

		&:focus,
		&:hover {
			background: rgba(26, 133, 255, 0.2);
		}
	}

	.button--active {
		background: rgba(26, 133, 255, 0.1);
	}
`;

export default class PaginationButtonsStyles extends Component {
	render() {
		return <PaginationButtons>{this.props.children}</PaginationButtons>;
	}
}
