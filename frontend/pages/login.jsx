import React, { Component } from "react";
import { getWordPressDataPage } from "../commonFunctions";

import Wrapper from "../components/atomic/molecules/Wrapper";

import LoginUser from "../components/users/LoginUser";

export default class Login extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`login`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<LoginUser content={this.props.content.content} />
			</Wrapper>
		);
	}
}
