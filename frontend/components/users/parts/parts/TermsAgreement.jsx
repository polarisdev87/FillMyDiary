import React, { Component } from "react";
import Router from "next/router";
import { getWordPressData } from "../../../../commonFunctions";
import { stagingToLiveURL } from "../../../helpers";

export default class TermsAgreement extends Component {
	gettingOptions = false;

	state = {
		options: {}
	};

	async componentDidMount() {
		let options = await this.menusWordPress();

		if (this.gettingOptions) {
			this.setState({
				options: options.terms_and_conditions
			});
		}
	}

	componentWillUnmount() {
		this.gettingOptions = false;
	}

	async menusWordPress() {
		this.gettingOptions = true;

		const options = await getWordPressData(`options/v2/all`);

		return options;
	}

	navigate(event) {
		event.preventDefault();

		if (event.target.tagName === "A") {
			var anchorLocation = event.target.getAttribute("href");

			if (!anchorLocation.startsWith("/")) {
				return false;
			}

			Router.push({
				pathname: anchorLocation
			});
		}
	}

	render() {
		const { acceptedTerms } = this.props;

		return (
			<div className="checkbox-container">
				<input
					type="checkbox"
					id="acceptedTerms"
					name="acceptedTerms"
					checked={acceptedTerms}
					onChange={this.props.handleChange}
				/>
				{this.state.options && this.state.options.label ? (
					<label htmlFor="acceptedTerms">
						<div
							onClick={event => this.navigate(event)}
							dangerouslySetInnerHTML={{ __html: this.state.options.label }}
						/>
					</label>
				) : (
					<label htmlFor="acceptedTerms">
						I accept the terms and conditions of my account
					</label>
				)}
			</div>
		);
	}
}
