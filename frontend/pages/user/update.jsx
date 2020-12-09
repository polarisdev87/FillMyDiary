import React, { Component } from "react";
import { getWordPressDataPage } from "../../commonFunctions";

import RestrictAreaCurrent from "../../components/atomic/particles/RestrictAreaCurrent";

import Wrapper from "../../components/atomic/molecules/Wrapper";

import UpdateUser from "../../components/users/update/UpdateUser";

export default class UpdateUserPage extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`user-update`);
		return data;
	}

	render() {
		return (
			<Wrapper>
				<RestrictAreaCurrent id={this.props.query.id}>
					<UpdateUser
						id={this.props.query.id}
						content={this.props.content.content}
					/>
				</RestrictAreaCurrent>
			</Wrapper>
		);
	}
}
