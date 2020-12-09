import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";

import Link from "../atomic/atoms/Link";

const SingleReview = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: 0 16px;
	padding: 16px 0;

	border-bottom: 1px solid #d9d9d9;

	a {
		text-decoration: none;
	}

	h3,
	h4,
	.review__score {
		margin: 0;
	}

	h3,
	h4 {
		color: #737373;
	}

	h3 {
		font-size: 16px;
		font-weight: bold;
		line-height: 21px;
	}

	h4 {
		font-size: 12px;
		font-weight: 500;
		line-height: 15px;
	}

	.review__details {
		display: flex;
		flex-direction: column;

		color: ${props => (props.theme.black ? props.theme.black : "#141213")};
	}

	.review__score {
		color: ${props => (props.theme.primary ? props.theme.primary : "#4285f4")};
		font-style: normal;
		font-weight: 500;
		line-height: 18px;
		font-size: 16px;

		color: #737373;
	}
`;

export default class Review extends Component {
	render() {
		const { review } = this.props;

		return (
			<SingleReview className="review">
				<div className="review__details">
					<Link href={{ pathname: "/job", query: { id: review.job.id } }}>
						<a>
							<h3>{review.reviewer ? review.reviewer : review.job.title}</h3>
						</a>
					</Link>
				</div>
				<div className="review__score">
					<span>{review.score}</span>
				</div>
			</SingleReview>
		);
	}
}
