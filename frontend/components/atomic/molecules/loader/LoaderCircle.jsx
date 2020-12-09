import React, { Component } from "react";
import styled from "styled-components";

import LoaderCircle from "../../../../assets/icons/loader-circle.svg";

const SpinnerElement = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 99999;

	background: rgba(255, 255, 255, 0.95);
	color: ${props => (props.theme.black ? props.theme.black : "#141213")};

	.spinner {
		height: 66px;
		width: 66px;
		animation: contanim 2s linear infinite;
	}

	label {
		margin-top: 32px;
	}

	svg {
		display: block;

		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;

		left: 0;
		top: 0;
		position: absolute;

		stroke-dasharray: 1, 300;
		stroke-dashoffset: 0;
		stroke-width: 5px;
		transform: rotate(-90deg);
		transform-origin: center center;

		circle:nth-of-type(1) {
			animation: strokeanim 3s calc(0.2s * (1)) ease infinite;
			stroke: ${props =>
				props.theme.primary ? props.theme.primary : "#1a85ff"};
		}

		circle:nth-of-type(2) {
			animation: strokeanim 3s calc(0.2s * (2)) ease infinite;
			stroke: ${props =>
				props.theme.green500 ? props.theme.green500 : "#68ff1a"};
		}

		circle:nth-of-type(3) {
			animation: strokeanim 3s calc(0.2s * (3)) ease infinite;
			stroke: ${props =>
				props.theme.secondary ? props.theme.secondary : "#ffae1a"};
		}

		circle:nth-of-type(4) {
			animation: strokeanim 3s calc(0.2s * (4)) ease infinite;
			stroke: ${props =>
				props.theme.primary ? props.theme.primary : "#1a85ff"};
		}
	}

	@keyframes strokeanim {
		0% {
			stroke-dasharray: 1, 300;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 120, 300;
			stroke-dashoffset: -175.6449737548828 / 3;
		}
		100% {
			stroke-dasharray: 120, 300;
			stroke-dashoffset: -175.6449737548828;
		}
	}

	@keyframes contanim {
		100% {
			transform: rotate(360deg);
		}
	}
`;

export default class Breadcrumbs extends Component {
	render() {
		return (
			<SpinnerElement>
				<div className="spinner">
					<LoaderCircle />
				</div>
				<label>Loading Content 🔨</label>
			</SpinnerElement>
		);
	}
}
