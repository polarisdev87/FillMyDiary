import React, { Component } from "react";
import { getWordPressDataPage } from "../../commonFunctions";

import Wrapper from "../../components/atomic/molecules/Wrapper";

import PasswordReset from "../../components/users/PasswordReset";

export default class ResetPassword extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`user-reset-password`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<PasswordReset
					content={this.props.content.content}
					resetToken={this.props.query.resetToken}
				/>
			</Wrapper>
		);
	}
}
