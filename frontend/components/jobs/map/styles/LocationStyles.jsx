import React, { Component } from "react";
import styled from "styled-components";

const LocationStylesElement = styled.div`
	@keyframes fadeBlip {
		0% {
			transform: translate(-50%, -50%) scale(0, 0);
			opacity: 0;
		}
		90% {
			transform: translate(-50%, -50%) scale(0.6, 0.6);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) scale(1, 1);
			opacity: 0;
		}
	}

	height: 400px;

	&:before {
		/* content: ""; */
		display: block;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 2;

		cursor: default;
	}

	div[title="Job Location"] {
		overflow: initial !important;
		opacity: 1 !important;

		&:before {
			border-radius: 50%;
			content: "";
			display: block;
			height: 192px;
			top: 50%;
			left: 50%;
			width: 192px;
			z-index: -999;

			animation: fadeBlip 6s infinite ease;
			background-color: rgba(
				${props =>
					props.theme.primaryRGB ? props.theme.primaryRGB : "26,133,255"},
				0.2
			);
			border: 1px solid
				${props => (props.theme.primary ? props.theme.primary : "blue")};
		}
	}
`;

export default class LocationStyles extends Component {
	render() {
		return <LocationStylesElement>{this.props.children}</LocationStylesElement>;
	}
}
