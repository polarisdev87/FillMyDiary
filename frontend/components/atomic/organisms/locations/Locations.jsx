import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { Container, Row, Col } from "react-grid-system";
import styled, { css, keyframes } from "styled-components";
import { InView } from "react-intersection-observer";

import { device } from "../../../../lib/MediaQueries";

import Jobs from "./parts/Jobs";

/* TODO: Add speed from this.props */

const count = 10,
	speed = 2;

function createCSS() {
	let styles = "";

	for (let i = 0; i < count; i++) {
		styles += `
       .location__point:nth-of-type(${i}) {
				animation-delay: ${i * speed}s;
       }
     `;
	}

	return css`
		${styles}
	`;
}

// Create the keyframes
const show = keyframes`
		from {
			transform: translate(-50%, -50%) scale(0, 0);
			opacity: 0;
		}

		10% {
			transform: translate(-50%, -50%) scale(0.6, 0.6);
			opacity: 1;
		}

		15% {
			transform: translate(-50%, -50%) scale(1, 1);
			opacity: 1;
		}

		20% {
			transform: translate(-50%, -50%) scale(2, 2);
			opacity: 0;
		}
`;

const StyledLocations = styled.div`
	margin: 32px 15px;
	max-width: 1566px;

	opacity: 0;
	transform: translateX(-100px);
	transition: 1s all ease;

	@media ${device.sm} {
		margin: 64px 45px;
	}

	@media ${device.lg} {
		margin: 128px 45px;
	}

	@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
		opacity: 1;
		transform: translateX(0px);
	}

	&.row--show {
		opacity: 1;
		transform: translateX(0px);
	}

	.location__row {
		@media ${device.md} {
			align-items: center !important;
		}
	}

	.location__map {
		align-items: center;
		display: none;
		position: relative;

		@media ${device.md} {
			display: inline-flex;
		}
	}

	.location__point {
		border-radius: 50%;
		display: block;
		position: absolute;
		width: 24px;
		height: 24px;
		z-index: 9999;

		animation: ${show} ${count * speed}s linear infinite;
		background-color: rgba(
			${props =>
				props.theme.primaryRGB ? props.theme.primaryRGB : "26,133,255"},
			0.2
		);
		border: 1px solid
			${props => (props.theme.primary ? props.theme.primary : "blue")};
		opacity: 0;

		@media ${device.sm} {
			width: 48px;
			height: 48px;
		}
	}

	.location__point:nth-of-type(1) {
		right: 20%;
		bottom: 7.5%;
	}

	.location__point:nth-of-type(2) {
		right: 30%;
		bottom: 20%;
	}

	.location__point:nth-of-type(3) {
		right: 15%;
		bottom: 35%;
	}

	.location__point:nth-of-type(4) {
		right: 8.5%;
		bottom: 15%;
	}

	.location__point:nth-of-type(5) {
		right: 44%;
		top: 10%;
	}

	.location__point:nth-of-type(6) {
		left: 55%;
		bottom: 20%;
	}

	.location__point:nth-of-type(7) {
		right: 30%;
		top: 50%;
	}

	.location__point:nth-of-type(8) {
		left: 55%;
		bottom: 4%;
	}

	.location__point:nth-of-type(9) {
		right: 40%;
		top: 25%;
	}

	.location__point:nth-of-type(10) {
		bottom: 30%;
		right: 20%;
	}

	${createCSS()};
`;

export default class Map extends Component {
	state = {
		speed: this.props.speed
	};

	navigate(event) {
		event.preventDefault();

		if (event.target.tagName === "A") {
			var anchorLocation = event.target.getAttribute("href");

			if (!anchorLocation.startsWith("/")) {
				return false;
			}

			Router.push({
				pathname: anchorLocation
			});
		}
	}

	render() {
		const { content, image, speed } = this.props;

		return (
			<InView threshold={0.25} triggerOnce={true}>
				{({ inView, ref }) => (
					<StyledLocations ref={ref} className={inView && "row--show"}>
						<Row className="location__row">
							<Col lg={6} push={{ lg: 5 }} offset={{ lg: 1 }}>
								<Jobs content={content} />
							</Col>
							<Col lg={5} pull={{ lg: 7 }}>
								<div className="location__map">
									<img src={image} />
									{Array.from(Array(10)).map((item, index) => (
										<div
											className="location__point"
											key={`location__point__${index}`}
										/>
									))}
								</div>
							</Col>
						</Row>
					</StyledLocations>
				)}
			</InView>
		);
	}
}
