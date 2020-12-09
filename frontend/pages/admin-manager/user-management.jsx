import React, { Component } from "react";

import RestrictAreaAdmin from "../../components/atomic/particles/RestrictAreaAdmin";

import HeaderAdmin from "../../components/header/Admin";

import UserPermissions from "../../components/admin/UserPermissions";

export default class UserManagement extends Component {
	render() {
		return (
			<RestrictAreaAdmin>
				<HeaderAdmin />
				<UserPermissions />
			</RestrictAreaAdmin>
		);
	}
}
