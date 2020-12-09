import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";

import { trueTypeOf } from "../../../helpers";

import ErrorMessage from "../../../atomic/molecules/ErrorMessage";
import Message from "../../../atomic/molecules/message/Message";

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

function checkIfDuplicateExists(w) {
	return new Set(w).size !== w.length;
}

export default class ManualSubmit extends Component {
	state = {
		disabled: false
	};

	render() {
		const {
			acceptedTerms,
			createTheUserManual,
			createUser,
			address,
			businessName,
			email,
			password,
			trades,
			town,
			city,
			telephone,
			postcode
		} = this.props;

		const m1 = this.props.manualReferenceOne,
			m2 = this.props.manualReferenceTwo,
			m3 = this.props.manualReferenceThree;

		var invalidFields = false,
			invalidReferences = false;

		if (
			m1 === "" ||
			m2 === "" ||
			m3 === "" ||
			checkIfDuplicateExists([m1, m2, m3])
		) {
			invalidReferences = true;
		}

		if (
			acceptedTerms === false ||
			address === "" ||
			businessName === "" ||
			email === "" ||
			password === "" ||
			trades === "" ||
			trades.length === 0 ||
			town === "" ||
			city === "" ||
			telephone === "" ||
			postcode === ""
		) {
			invalidFields = true;
		}

		return (
			<>
				<Message>
					<p>
						The site is currently in early access, which means you can bypass
						stripe using the card number `4242-4242-4242-4242` with an valid
						expiration date and CVV code (02/22) and 222
					</p>
				</Message>
				<StripeCheckout
					amount={2500}
					currency="GBP"
					description={"Manual References require £25 service fee"}
					email={email}
					image="https://s3-eu-west-2.amazonaws.com/fill-my-diary-london/wp-content/uploads/2019/01/26203830/logo.png" // the pop-in header image (default none)
					locale="en"
					name="Fill My Diary" // the pop-in header title
					stripeKey="pk_test_TnHNORm57NPvgArEANE2aXbn00U947RYXZ"
					token={res => createTheUserManual(res, createUser)} // submit callback
				>
					{invalidFields ? (
						<button
							type="button"
							disabled={true}
							className="button button--primary"
						>
							Required Fields Missing Values
						</button>
					) : (
						<button
							type="button"
							disabled={invalidReferences}
							className="button button--primary"
						>
							{invalidReferences
								? `Please enter valid references`
								: `Create Account`}
						</button>
					)}
				</StripeCheckout>
			</>
		);
	}
}
