import React, { Component } from "react";
import { Mutation } from "react-apollo";

import FormBuilder from "./FormBuilder";
import FormTradesmen from "./FormTradesmen";

import JobReviewFormStyles from "./styles/JobReviewFormStyles";

import { CREATE_REVIEW_MUTATION } from "../../../../../../../mutations/review/CreateReview";

export default class JobReviewForm extends Component {
	state = {
		fieldOne: true,
		fieldTwo: true,
		fieldThree: true,
		job: this.props.job.id,
		reviewer: this.props.user.name,
		score: 10,
		submitted: false,
		type: this.props.type
	};

	handleChange = e => {
		const { name, type, value } = e.target;

		// Convert Radio input value of string to Boolean
		const val = value === "true" ? true : false;

		// Create variable input score, which defaults to 3, unless first field in which case apply 4
		var inputScore = name === "fieldOne" ? 4 : 3;

		// If the input is positive, keep positive integer, if negative review, invert integer to negative value
		val ? null : (inputScore = -Math.abs(inputScore));

		// Create a new constant equalling the current score adding the new inputScore variable
		const newScore = this.state.score + inputScore;

		this.setState({ [name]: val });
		this.setState({ score: newScore });
	};

	render() {
		const { job, reviewing } = this.props;

		if (!reviewing) return null;

		return (
			<Mutation mutation={CREATE_REVIEW_MUTATION} variables={this.state}>
				{(createReview, { loading, error }) => (
					<JobReviewFormStyles>
						<section className="review__content">
							<button
								className="review__close button--secondary"
								onClick={e => this.props.toggleReviewing(e)}
							>
								x
							</button>
							{this.state.submitted && (
								<h3 className="review__heading">Thank you for your review</h3>
							)}
							{!this.state.submitted && (
								<h3 className="review__heading">Reviewing {job.title}</h3>
							)}
							<form
								onSubmit={async e => {
									// Stop form from submiting
									e.preventDefault();
									// Stop form from submiting
									this.setState({ submitted: true });
									// Call the mutation
									const res = await createReview();
									// Wait 5 seconds then close modal
									setTimeout(this.props.toggleReviewing, 5000);
								}}
							>
								{this.state.type === "Tradesmen" && !this.state.submitted && (
									<FormTradesmen loading={loading} onChange={this.onChange} />
								)}
								{this.state.type === "Builder" && !this.state.submitted && (
									<FormBuilder loading={loading} onChange={this.onChange} />
								)}
								{!this.state.submitted && (
									<button type="submit" disabled={this.state.submitted}>
										Submit Review
									</button>
								)}
							</form>
						</section>
					</JobReviewFormStyles>
				)}
			</Mutation>
		);
	}
}
