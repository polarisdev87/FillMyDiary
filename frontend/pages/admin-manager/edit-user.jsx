import React, { Component } from "react";
import { getWordPressDataPage } from "../../commonFunctions";

import RestrictAreaAdmin from "../../components/atomic/particles/RestrictAreaAdmin";

import HeaderAdmin from "../../components/header/Admin";

import UpdateUserAdmin from "../../components/users/UpdateUserAdmin";

export default class EditUserPage extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`user-update-admin`);
		return data;
	}

	render() {
		return (
			<RestrictAreaAdmin>
				<HeaderAdmin />
				<UpdateUserAdmin
					id={this.props.query.id}
					content={this.props.content.content}
				/>
			</RestrictAreaAdmin>
		);
	}
}
