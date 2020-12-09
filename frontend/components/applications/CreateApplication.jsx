import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Mutation } from "react-apollo";
import Router from "next/router";
import styled from "styled-components";
import { APIURL } from "../../config";

import { CREATE_APPLICATION_MUTATION } from "../mutations/application/CreateApplication";

import HR from "../atomic/atoms/HR";

import ErrorMessage from "../atomic/molecules/ErrorMessage";
import Message from "../atomic/molecules/message/Message";
import LoaderCircle from "../atomic/molecules/loader/LoaderCircle";

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

export default class CreateApplication extends Component {
	state = {
		applying: false
	};

	componentDidMount() {
		fetch(`${APIURL}options/v2/all`)
			.then(function(response) {
				return response.json();
			})
			.then(
				result => {
					this.setState({ options: result });
				},
				error => {
					this.setState({ error });
				}
			);
	}

	onToken = async (res, createApplication) => {
		this.setState({ applying: true });

		// Call mutation after stirpe token recieved
		createApplication({
			variables: {
				id: this.props.job.id,
				token: res.id
			}
		}).catch(err => {
			alert(err.message);
		});

		Router.push({
			pathname: "/application-confirmation"
		});

		this.setState({ applying: false });
	};

	render() {
		const { job, user } = this.props;

		return (
			<Mutation mutation={CREATE_APPLICATION_MUTATION}>
				{createApplication => (
					<>
						<Message>
							<p>
								The site is currently in early access, which means you can
								bypass stripe using the card number `4242-4242-4242-4242` with
								an valid expiration date and CVV code (02/22) and 222
							</p>
						</Message>
						{!this.state.applying ? (
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
								token={res => this.onToken(res, createApplication)} // submit callback
							>
								<button className="button button--primary">
									Apply for the job
								</button>
							</StripeCheckout>
						) : null}
					</>
				)}
			</Mutation>
		);
	}
}
