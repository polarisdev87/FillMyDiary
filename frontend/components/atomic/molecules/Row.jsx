import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { Container, Row, Col } from "react-grid-system";
import { InView } from "react-intersection-observer";
import styled from "styled-components";

import { removeDimensions } from "../../helpers";
import { device } from "../../../lib/MediaQueries";

const StyledRow = styled.div`
	margin: 48px 15px;
	max-width: 1536px;

	opacity: 0;
	transform: translateX(-100px);
	transition: 1s all ease;

	@media ${device.sm} {
		margin: 64px 45px;
	}

	@media ${device.xl} {
		margin: 128px 45px;
	}

	@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
		opacity: 1;
		transform: translateX(0px);
	}

	&.mobile--order {
		> * {
			flex-direction: column-reverse;

			@media ${device.md} {
				flex-direction: row;
			}
		}
	}

	&.row--right {
		transform: translateX(100px);
	}

	&.row--show {
		opacity: 1;
		transform: translateX(0px);
	}

	h1 {
		margin-top: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		@media ${device.md} {
			margin-top: 0;
		}

		p + & {
			margin-top: 24px;
		}
	}

	img {
		margin-top: 32px;
		max-height: 400px;
		width: 100%;

		object-fit: cover;

		@media ${device.md} {
			margin-top: 0;
		}
	}

	p:last-of-type {
		margin-bottom: 0;
	}
`;

export default class RowElement extends Component {
	createHTML(html) {
		return { __html: html };
	}

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
		const { centerAlign, index, name, rows } = this.props;

		const classList =
			index % 2 === 0 ? "row--right mobile--order" : "row--left";

		return (
			<InView threshold={0.25} triggerOnce={true}>
				{({ inView, ref }) => (
					<StyledRow
						ref={ref}
						className={inView ? `${classList} row row--show` : `${classList}`}
					>
						<Row align="center">
							{Object.keys(rows).map((column, colIndex) => {
								var size = 0;
								const offset = colIndex % 2 ? 1 : 0;

								if (index % 2 === 0) {
									size = colIndex % 2 ? 5 : 6;
								} else {
									size = colIndex % 2 ? 6 : 5;
								}

								return (
									<Col key={column} lg={size} offset={{ lg: offset }}>
										<div
											dangerouslySetInnerHTML={{
												__html: removeDimensions(rows[column].content)
											}}
											onClick={event => this.navigate(event)}
										/>
									</Col>
								);
							})}
						</Row>
					</StyledRow>
				)}
			</InView>
		);
	}
}
