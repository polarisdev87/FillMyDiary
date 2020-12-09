import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Container, Row, Col } from "react-grid-system";
import Router from "next/router";
import styled from "styled-components";

import { device } from "../../lib/MediaQueries";

import { CURRENT_USER_QUERY } from "../queries/user/CurrentUser";

import { USER_LOGIN_MUTATION } from "../mutations/user/UserLogin";

import HR from "../atomic/atoms/HR";
import Link from "../atomic/atoms/Link";

import ErrorMessage from "../atomic/molecules/ErrorMessage";

const FormButtons = styled.nav`
	.button + .button {
		@media ${device.sm} {
			margin-left: 16px;
		}
	}
`;

export default class LoginUser extends Component {
	state = {
		email: "",
		password: ""
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		this.setState({ [name]: value });
	};

	render() {
		return (
			<Mutation
				mutation={USER_LOGIN_MUTATION}
				refetchQueries={[{ query: CURRENT_USER_QUERY }]}
				variables={this.state}
			>
				{(loginUser, { error, loading }) => {
					return (
						<form
							method="post"
							onSubmit={async e => {
								e.preventDefault();
								const res = await loginUser();
								this.setState({ email: "", password: "" });

								// If no user ID, redirect to create a homepage
								if (!res.data.loginUser.id) {
									Router.push({
										pathname: "/"
									});
								}

								// If access to user ID is available, redirect to user's page
								Router.push({
									pathname: "/user",
									query: { id: res.data.loginUser.id }
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
										<ErrorMessage error={error} />
										{this.props.content && (
											<p
												dangerouslySetInnerHTML={{
													__html: this.props.content["paragraph_one"].value
												}}
											/>
										)}
										<Link href="/register" classList="button">
											<a>Need an account? Sign up here</a>
										</Link>
										<HR invisible={true} size={"md"} />
									</Col>
									<Col lg={5} offset={{ lg: 1 }}>
										<label htmlFor="email">Email</label>
										<input
											autoComplete="username"
											type="email"
											id="email"
											name="email"
											required
											value={this.state.email}
											onChange={this.handleChange}
										/>
										<label htmlFor="password">Password</label>
										<input
											autoComplete="current-password"
											type="password"
											id="password"
											name="password"
											required
											value={this.state.password}
											onChange={this.handleChange}
										/>
									</Col>
								</Row>
							</fieldset>
							<Row>
								<Col lg={5} offset={{ lg: 7 }}>
									<FormButtons>
										<button
											type="submit"
											value="Login to Account"
											className="button"
										>
											Login to Account
										</button>
										<Link
											href="/user/request-password"
											classList="button button--secondary"
										>
											<a>Forgot password?</a>
										</Link>
									</FormButtons>
								</Col>
							</Row>
						</form>
					);
				}}
			</Mutation>
		);
	}
}
