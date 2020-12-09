import React, { Component } from "react";

import RestrictAreaAdmin from "../../components/atomic/particles/RestrictAreaAdmin";

import HeaderAdmin from "../../components/header/Admin";

import UserQueue from "../../components/admin/UserQueue";

export default class Queue extends Component {
	render() {
		return (
			<RestrictAreaAdmin>
				<HeaderAdmin />
				<h1>Queue View</h1>
				<UserQueue />
			</RestrictAreaAdmin>
		);
	}
}
