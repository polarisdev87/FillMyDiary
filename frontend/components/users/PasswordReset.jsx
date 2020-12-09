import React, { Component } from "react";
import { Mutation } from "react-apollo";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-grid-system";

import { RESET_PASSWORD_MUTATION } from "../mutations/user/ResetPassword";

import { CURRENT_USER_QUERY } from "../queries/user/CurrentUser";

import HR from "../atomic/atoms/HR";

import ErrorMessage from "../atomic/molecules/ErrorMessage";
import SuccessMessage from "../atomic/molecules/SuccessMessage";

const success = {
	message: "Your password has been set and you are now logged in."
};

export default class PasswordReset extends Component {
	static propTypes = {
		resetToken: PropTypes.string.isRequired
	};

	createMarkup(content) {
		return { __html: content };
	}

	state = {
		confirmPassword: "",
		password: "",
		signedIn: false
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<Mutation
				mutation={RESET_PASSWORD_MUTATION}
				refetchQueries={[{ query: CURRENT_USER_QUERY }]}
				variables={{
					resetToken: this.props.resetToken,
					password: this.state.password,
					confirmPassword: this.state.confirmPassword
				}}
			>
				{(reset, { error, loading }) => {
					return (
						<form
							method="post"
							onSubmit={async e => {
								e.preventDefault();
								await reset();
								this.setState({
									password: "",
									confirmPassword: "",
									signedIn: true
								});
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
										{this.props.content && (
											<p
												dangerouslySetInnerHTML={this.createMarkup(
													this.props.content["paragraph_one"].value
												)}
											/>
										)}
									</Col>
									<Col lg={5} offset={{ lg: 1 }}>
										<ErrorMessage error={error} />
										{this.state.signedIn && (
											<SuccessMessage success={success} />
										)}
										<label htmlFor="password">New Password</label>
										<input
											autoComplete="new-password"
											type="password"
											id="password"
											name="password"
											required
											value={this.state.password}
											onChange={this.handleChange}
										/>
										<label htmlFor="confirmPassword">Confirm Password</label>
										<input
											autoComplete="new-password"
											type="password"
											id="confirmPassword"
											name="confirmPassword"
											required
											value={this.state.confirmPassword}
											onChange={this.handleChange}
										/>
									</Col>
								</Row>
							</fieldset>
							<Row>
								<Col lg={5} offset={{ lg: 7 }}>
									<button type="submit" value="Reset Password">
										Reset Password
									</button>
								</Col>
							</Row>
						</form>
					);
				}}
			</Mutation>
		);
	}
}
