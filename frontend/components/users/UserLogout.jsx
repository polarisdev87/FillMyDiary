import React, { Component } from "react";
import { Mutation } from "react-apollo";

import { LOGOUT_USER_MUTATION } from "../mutations/user/UserLogout";

import { CURRENT_USER_QUERY } from "../queries/user/CurrentUser";

const UserLogout = props => (
	<Mutation
		mutation={LOGOUT_USER_MUTATION}
		refetchQueries={[{ query: CURRENT_USER_QUERY }]}
	>
		{logoutUser => (
			<button className="button--secondary" onClick={logoutUser}>
				Log Out
			</button>
		)}
	</Mutation>
);

export default UserLogout;
