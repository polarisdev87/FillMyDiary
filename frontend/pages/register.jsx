import React, { Component } from "react";
import { getWordPressDataPage } from "../commonFunctions";

import Wrapper from "../components/atomic/molecules/Wrapper";

import CreateUser from "../components/users/create/CreateUser";

export default class Register extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`register`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<CreateUser content={this.props.content.content} />
			</Wrapper>
		);
	}
}
