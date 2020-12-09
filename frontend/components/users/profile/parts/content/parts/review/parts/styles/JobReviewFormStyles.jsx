import React, { Component } from "react";
import styled from "styled-components";

const JobReviewFormStylesWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10000;

	background: rgba(0, 0, 0, 0.4);

	.review__heading {
		margin-top: 0;
	}

	.review__close {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
	}

	.review__content {
		padding: 48px;
		position: relative;

		background: white;
	}

	fieldset {
		margin-bottom: 16px;
	}

	input[type="radio"] {
		display: none;

		&:checked {
			+ label {
				display: flex;
				justify-content: space-between;

				background: rgba(26, 133, 255, 0.1);
				border: 1px solid
					${props => (props.theme.blue600 ? props.theme.blue600 : "#006be6")};
				color: ${props =>
					props.theme.blue600 ? props.theme.blue600 : "#006be6"};
			}
		}
	}

	label + label {
		margin-top: 16px;
		padding-top: 16px;

		border-top: 1px solid
			${props => (props.theme.grey100 ? props.theme.grey100 : "#d9d9d9")};
	}

	input + label {
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

export default class JobReviewFormStyles extends Component {
	render() {
		return (
			<JobReviewFormStylesWrapper>
				{this.props.children}
			</JobReviewFormStylesWrapper>
		);
	}
}
