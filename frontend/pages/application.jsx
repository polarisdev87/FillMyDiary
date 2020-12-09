import React, { Component } from "react";
import { getWordPressDataPage } from "../commonFunctions";

import RestrictAreaUser from "../components/atomic/particles/RestrictAreaUser";

import Wrapper from "../components/atomic/molecules/Wrapper";

import SingleApplicationUser from "../components/applications/SingleApplicationUser";

export default class Application extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`application`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<RestrictAreaUser>
					<SingleApplicationUser
						content={this.props.content.content}
						id={this.props.query.id}
					/>
				</RestrictAreaUser>
			</Wrapper>
		);
	}
}
