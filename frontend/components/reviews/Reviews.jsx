import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Container, Row, Col } from "react-grid-system";
import styled, { ThemeProvider } from "styled-components";

import { perPage } from "../../config";

import { USER_APPOINTED_REVIEWS_QUERY } from "../queries/review/UserReviewsAppointed";

import IconCheck from "../../assets/icons/fa/check.svg";

import Link from "../atomic/atoms/Link";

import LoaderCircle from "../atomic/molecules/loader/LoaderCircle";

import Review from "./Review";

const ReviewsElement = styled.aside`
	margin-top: 64px;
	padding-bottom: 16px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);

	.reviews__overall {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 16px;

		background: rgba(26, 133, 255, 0.1);

		h3 {
			margin: 0;

			font-weight: 500;
			line-height: 15px;
			font-size: 12px;

			color: #3c72b3;
		}
	}

	.reviews__overall__count {
		font-weight: bold;
		line-height: 21px;
		font-size: 18px;

		color: #1a85ff;
	}

	.reviews__overall__icons {
		display: flex;

		svg {
			height: 16px;

			fill: #1a85ff;

			& + svg {
				margin-left: 6px;
			}
		}

		.invalid {
			fill: #6792c6;
			opacity: 0.5;
		}
	}

	.reviews__title {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 16px;

		h2 {
			margin: 0;
			font-weight: 500;
			font-style: normal;
			line-height: 21px;
			font-size: 14px;

			color: #141213;
		}
	}
`;

export default class Reviews extends Component {
	render() {
		return (
			<React.Fragment>
				<Query
					fetchPolicy="network-only"
					query={USER_APPOINTED_REVIEWS_QUERY}
					variables={{ id: this.props.userID }}
				>
					{({ data, error, loading }) => {
						if (loading) return <LoaderCircle />;
						if (error) return <Error error={error} />;
						if (!data.reviews || data.reviews.length === 0) return null;
						const reviewTotal = 10;
						const countReviews = data.reviews.length;
						var totalScore = data.reviews
							.map(review => review.score)
							.reduce((prev, next) => prev + next);
						totalScore = totalScore / countReviews;
						totalScore = totalScore.toFixed(0);
						const reviewFromMax = reviewTotal - totalScore;
						return (
							<ReviewsElement>
								<div className="reviews__title">
									<h2>Your Reviews</h2>
									<span className="reviews__total">{totalScore} / 10</span>
								</div>
								<div className="reviews__overall">
									<div>
										<h3>Overall Rating</h3>
										<span className="reviews__overall__count">
											{totalScore}
										</span>
									</div>
									<div className="reviews__overall__icons">
										{Array.apply(null, { length: totalScore }).map((e, i) => (
											<IconCheck className="valid" key={`valid-` + i} />
										))}
										{Array.apply(null, { length: reviewFromMax }).map(
											(e, i) => (
												<IconCheck className="invalid" key={`invalid-` + i} />
											)
										)}
									</div>
								</div>
								{data.reviews.map((review, index) => (
									<Review index={index} key={review.id} review={review} />
								))}
							</ReviewsElement>
						);
					}}
				</Query>
			</React.Fragment>
		);
	}
}
