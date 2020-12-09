import React, { Component } from "react";
import { getWordPressDataPage } from "../commonFunctions";

import RestrictAreaUser from "../components/atomic/particles/RestrictAreaUser";

import Wrapper from "../components/atomic/molecules/Wrapper";

import UserProfile from "../components/users/profile/UserProfile";

export default class User extends Component {
	static async getInitialProps({ query }) {
		const data = await getWordPressDataPage(`user`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<RestrictAreaUser me={this.props.me}>
					<UserProfile
						id={this.props.query.id}
						me={this.props.me}
						user={this.props.query}
					/>
				</RestrictAreaUser>
			</Wrapper>
		);
	}
}
