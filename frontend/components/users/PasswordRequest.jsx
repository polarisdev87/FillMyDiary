import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Row, Col } from "react-grid-system";

import { REQUEST_RESET_PASSWORD_MUTATION } from "../mutations/user/RequestResetPassword";

import HR from "../atomic/atoms/HR";

import ErrorMessage from "../atomic/molecules/ErrorMessage";
import SuccessMessage from "../atomic/molecules/SuccessMessage";

const success = {
	message: "Check your email for a reset link."
};

export default class PasswordRequest extends Component {
	state = {
		email: ""
	};

	createMarkup(content) {
		return { __html: content };
	}

	handleChange = e => {
		const { name, type, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<Mutation
				mutation={REQUEST_RESET_PASSWORD_MUTATION}
				variables={this.state}
			>
				{(reset, { error, loading, called }) => {
					return (
						<form
							method="post"
							onSubmit={async e => {
								e.preventDefault();
								await reset();
								this.setState({ email: "" });
							}}
						>
							<fieldset>
								<HR invisible={true} />
								<Row>
									<Col lg={6}>
										<h1 className="h2">
											{this.props.content &&
												this.props.content["heading_one"].value}
										</h1>
										<ErrorMessage error={error} />
										{this.props.content && (
											<p
												dangerouslySetInnerHTML={this.createMarkup(
													this.props.content["paragraph_one"].value
												)}
											/>
										)}
									</Col>
									<Col lg={5} offset={{ lg: 1 }}>
										{!error && !loading && called && (
											<SuccessMessage success={success} />
										)}
										<label htmlFor="email">Email</label>
										<input
											type="email"
											id="email"
											name="email"
											required
											value={this.state.email}
											onChange={this.handleChange}
										/>
										<button type="submit" value="Request Reset Password">
											Request Reset Password
										</button>
									</Col>
								</Row>
							</fieldset>
						</form>
					);
				}}
			</Mutation>
		);
	}
}
