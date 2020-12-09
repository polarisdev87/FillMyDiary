import React, { Component } from "react";
import "isomorphic-fetch";
import { endpoint, prodEndpoint } from "../../../../config";

import ErrorMessage from "../../molecules/ErrorMessage";
import SuccessMessage from "../../molecules/SuccessMessage";

export default class SupportForm extends Component {
	state = {
		email: "",
		submitted: false,
		success: {
			message:
				"Thank you for submitting our form, we'll reply to you as soon as possible with a reply."
		}
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		var val = type === "number" ? parseFloat(value) : value;

		this.setState({ [name]: val });
	};

	handleMessageChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	submitForm = async e => {
		if (e) e.preventDefault();

		this.setState({ submitted: true });

		const response = await fetch(`${prodEndpoint}/api/v1/public/send-email`, {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			},
			body: JSON.stringify({
				email: this.state.email,
				message: this.state.message,
				subject: this.state.subject
			})
		});

		const data = await response.json();

		if (data.error) {
			this.setState({ error: data.error });
		}

		return data;
	};

	render() {
		return (
			<>
				{!this.state.submitted && (
					<form onSubmit={e => this.submitForm(e)}>
						<label htmlFor="email">Email Address</label>
						<input
							name="email"
							id="email"
							onChange={this.handleChange}
							required
							type="email"
							value={this.state.email}
						/>
						<label htmlFor="subject">Subject</label>
						<input
							name="subject"
							id="subject"
							onChange={this.handleChange}
							required
							type="text"
							value={this.state.subject}
						/>
						<label htmlFor="message">Message</label>
						<textarea
							name="message"
							id="message"
							onChange={this.handleMessageChange}
							required
							value={this.state.message}
						/>
						<button type="submit" value="Submit Form">
							Submit Form
						</button>
						{this.state.error && <ErrorMessage error={this.state.error} />}
					</form>
				)}
				{this.state.submitted && (
					<SuccessMessage success={this.state.success} />
				)}
			</>
		);
	}
}
