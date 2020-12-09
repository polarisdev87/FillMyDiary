import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { Container, Row, Col } from "react-grid-system";
import styled from "styled-components";

import { device } from "../../../lib/MediaQueries";

const StyledHero = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	left: 50%;
	margin-left: -50vw;
	position: relative;
	width: 100vw;

	color: ${props =>
		props.colour === "#ffffff" ? props.theme.black : props.theme.white};

	min-height: 200px;
	min-height: ${props =>
		props.size === `large`
			? `600px`
			: props.size === `medium`
			? `400px`
			: props.size === `small`
			? `200px`
			: `200px`};

	+ *:not(.hero) {
		margin-top: 32px;

		@media ${device.xl} {
			margin-top: 64px;
		}
	}

	.hero__content {
		margin: 0 auto;
		max-width: 1526px;
		width: 100%;
	}

	.hero__text {
		margin: 0 auto 0 0;
		margin: ${props =>
			props.alignment === `right`
				? `0 0 0 auto`
				: props.alignment === `center`
				? `0 auto`
				: `0 auto 0 0`};

		max-width: 760px;
		padding: 24px 15px;
		position: relative;
		width: 100%;
		z-index: 3;

		text-shadow: ;
		text: ${props =>
			props.colour === "#ffffff" ? `` : `0px 1px 5px rgba(0, 0, 0, 0.2)`};

		@media ${device.sm} {
			padding: 48px 45px;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin-top: 0;
		}

		* + h1,
		* + h2,
		* + h3,
		* + h4,
		* + h5,
		* + h6 {
			margin-top: 48px;
		}

		a {
			border-radius: 3px;
			display: inline-block;
			padding: 16px;
			position: relative;

			border: none;
			background-color: ${props =>
				props.colour !== "#ffffff" ? "#fff" : "#1a85ff"};
			color: ${props => (props.colour !== "#ffffff" ? "#0533e2" : "#fff")};
			cursor: pointer;
			font-family: "Euclid", Arial, Helvetica Neue, Helvetica, sans-serif;
			font-size: 2rem;
			font-weight: 700;
			letter-spacing: 0.5px;
			line-height: 2rem;
			outline: none;
			text-align: center;
			text-decoration: none;
			text-transform: capitalize;
			transition: 0.2s all ease;

			&:active,
			&:focus,
			&:hover {
				text-decoration: none;
			}
		}

		a + a {
			margin-left: 8px;
		}
	}

	.hero__media {
		display: block;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;

		object-fit: cover;

		img,
		picture {
			display: block;
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;

			object-fit: cover;
		}

		z-index: 1;
	}

	.hero__overlay {
		display: block;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 2;

		background: ${props => (props.colour ? props.colour : `#141213`)};
		opacity: ${props => (props.overlay ? props.overlay : 0.8)};

		@media ${device.sm} {
			background: ${props =>
				props.gradient
					? `linear-gradient(
			to right,
			rgba(5, 75, 255, 1) 0%,
			rgba(5, 75, 255, 0) 100%
		)`
					: props.colour
					? props.colour
					: "#141213"};

			transform: ${props =>
				props.alignment === `right` ? `rotate(180deg)` : ``};
		}
	}
`;

export default class Hero extends Component {
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
		const {
			alignment,
			colour,
			content,
			gradient,
			index,
			media,
			name,
			overlay,
			size
		} = this.props;

		const showGradient = gradient === "1" ? true : false;

		return (
			<StyledHero
				className="hero ignore"
				role="banner"
				alignment={alignment}
				colour={colour}
				gradient={showGradient}
				overlay={`0.` + overlay}
				size={size}
			>
				<div className="hero__content">
					<Row>
						<Col>
							<div
								className="hero__text"
								dangerouslySetInnerHTML={{ __html: content }}
								onClick={event => this.navigate(event)}
							/>
						</Col>
					</Row>
				</div>
				<div className="hero__overlay" />
				{media && (
					<div className="hero__media">
						<picture className="hero__media">
							<img src={media} alt="Hero background image" />
						</picture>
					</div>
				)}
			</StyledHero>
		);
	}
}
