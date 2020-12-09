import React, { Component } from "react";
import { getWordPressDataPage } from "../../commonFunctions";

import Wrapper from "../../components/atomic/molecules/Wrapper";

import PasswordRequest from "../../components/users/PasswordRequest";

export default class RequestPassword extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`user-request-password`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<PasswordRequest content={this.props.content.content} />
			</Wrapper>
		);
	}
}
