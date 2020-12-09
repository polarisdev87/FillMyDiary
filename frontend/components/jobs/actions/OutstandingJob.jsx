import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import styled from "styled-components";
import { APIURL } from "../../../config";

import { OUTSTANDING_JOB_MUTATION } from "../../mutations/job/OutstandingJob";

import { SINGLE_USER_QUERY } from "../../queries/user/SingleUser";

import ErrorMessage from "../../atomic/molecules/ErrorMessage";
import Message from "../../atomic/molecules/message/Message";
import LoaderCircle from "../../atomic/molecules/loader/LoaderCircle";

const TakeMyMoneyContainer = styled.section`
	margin-top: 64px;
	padding: 16px;

	background-color: ${props =>
		props.theme.white ? props.theme.white : "#FFF"};
	border-radius: 8px;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);

	h3 {
		margin-top: 0;
	}
`;

export default class OutstandingJob extends Component {
	state = {
		paid: false
	};

	onToken = async (res, outstandingJob) => {
		this.setState({ paid: true });

		// Call mutation after stirpe token recieved
		outstandingJob({
			variables: {
				id: this.props.job.id,
				token: res.id
			}
		}).catch(err => {
			alert(err.message);
			this.setState({ paid: false });
		});

		Router.push({
			pathname: "/user/orders",
			query: {
				id: this.props.user.id
			}
		});
	};

	render() {
		const { job, user } = this.props;

		return (
			<Mutation
				mutation={OUTSTANDING_JOB_MUTATION}
				refetchQueries={[
					{
						query: SINGLE_USER_QUERY,
						variables: {
							id: this.props.user.id
						}
					}
				]}
			>
				{outstandingJob => (
					<>
						<Message>
							<p>
								The site is currently in early access, which means you can
								bypass stripe using the card number `4242-4242-4242-4242` with
								an valid expiration date and CVV code (02/22) and 222
							</p>
						</Message>
						{!this.state.paid ? (
							<StripeCheckout
								amount={job.price * 10}
								currency="GBP"
								description={
									this.state.options
										? this.state.options.stripe_checkout_message
										: "If you are selected, you will be charged 10%"
								} // the pop-in header subtitle
								email={user.email}
								image="https://s3-eu-west-2.amazonaws.com/fill-my-diary-london/wp-content/uploads/2019/01/26203830/logo.png" // the pop-in header image (default none)
								locale="en"
								name="Fill My Diary" // the pop-in header title
								panelLabel="Pending Payment {{amount}}"
								stripeKey="pk_test_TnHNORm57NPvgArEANE2aXbn00U947RYXZ"
								token={res => this.onToken(res, outstandingJob)} // submit callback
							>
								<button
									className="button button--primary"
									disabled={this.state.paid}
								>
									Pay For Job
								</button>
							</StripeCheckout>
						) : null}
					</>
				)}
			</Mutation>
		);
	}
}
