import React, { Component } from "react";
import styled from "styled-components";

import { device } from "../../../lib/MediaQueries";

const UserApplicationStatus = styled.div`
	margin-top: 12px;
	padding-top: 12px;

	border-top: 1px solid
		${props => (props.theme.grey100 ? props.theme.grey100 : "#d9d9d9")};

	@media ${device.sm} {
		&:hover {
			.application__status {
				&:after {
					z-index: 999;

					opacity: 1;
				}
			}
		}
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	h3,
	h4 {
		margin: 0;
		font-weight: 500;
		font-style: normal;
		line-height: 1.5;
		font-size: 14px;

		color: #141213;
	}

	h4 {
		font-size: 10px;
	}

	header {
		margin-left: 8px;
		width: 100%;
	}

	main {
		align-items: center;
		display: flex;
		flex-direction: row-reverse;
		width: 100%;
	}

	.application__status {
		align-items: center;
		border-radius: 50%;
		display: flex;
		height: 24px;
		justify-content: center;
		margin-right: 4px;
		width: 24px;

		background-color: rgba(
			${props => (props.theme.purpleRGB ? props.theme.purpleRGB : "91,26,255")},
			0.2
		);
		border: 1px solid
			${props => (props.theme.purple ? props.theme.purple : "#5b1aff")};
		flex-shrink: 0;
		font-size: 0px;
		position: relative;

		&:after {
			content: attr(data-status);
			padding: 8px 16px;
			position: absolute;
			right: calc(100% + 8px);
			top: 50%;
			z-index: -999;

			background-color: rgba(
				${props =>
					props.theme.purpleRGB ? props.theme.purpleRGB : "91,26,255"},
				1
			);
			color: ${props => (props.theme.white ? props.theme.white : "#FFF")};
			font-size: 12px;
			opacity: 0;
			transform: translateY(-50%);
			transition: 0.2s opacity ease;
		}

		svg {
			width: 50%;

			fill: ${props => (props.theme.purple ? props.theme.purple : "#5b1aff")};
		}

		&[data-status="Accepted"] {
			background-color: rgba(
				${props =>
					props.theme.primaryRGB ? props.theme.primaryRGB : "26,133,255"},
				0.2
			);
			border: 1px solid
				${props => (props.theme.primary ? props.theme.primary : "#1a85ff")};

			&:after {
				background-color: rgba(
					${props =>
						props.theme.primaryRGB ? props.theme.primaryRGB : "26,133,255"},
					1
				);
			}

			svg {
				fill: ${props =>
					props.theme.primary ? props.theme.primary : "#1a85ff"};
			}
		}

		&[data-status="Unsuccessful"] {
			background-color: rgba(
				${props => (props.theme.redRGB ? props.theme.redRGB : "255,26,26")},
				0.2
			);
			border: 1px solid
				${props => (props.theme.red ? props.theme.red : "#ff1a1a")};

			&:after {
				background-color: rgba(
					${props => (props.theme.redRGB ? props.theme.redRGB : "255,26,26")},
					1
				);
			}

			svg {
				fill: ${props => (props.theme.red ? props.theme.red : "#ff1a1a")};
			}
		}
	}
`;

export default class UserApplicationStatusStyles extends Component {
	render() {
		return <UserApplicationStatus>{this.props.children}</UserApplicationStatus>;
	}
}
