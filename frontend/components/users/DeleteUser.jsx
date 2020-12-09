import React, { Component } from "react";
import { Mutation } from "react-apollo";

import { DELETE_USER_MUTATION } from "../mutations/user/DeleteUser";

import { ALL_UNAPPROVED_USERS_QUERY } from "../queries/user/AllUnapprovedUsers";
import { ALL_USERS_QUERY } from "../queries/user/AllUsers";

export default class DeleteUser extends Component {
	render() {
		const userID = this.props.user;
		return (
			<Mutation
				mutation={DELETE_USER_MUTATION}
				refetchQueries={[
					{ query: ALL_UNAPPROVED_USERS_QUERY },
					{ query: ALL_USERS_QUERY }
				]}
				variables={{ id: this.props.id }}
			>
				{(deleteUser, { error }) => (
					<button
						className="button button--secondary"
						onClick={() => {
							if (confirm("Are you sure you want to delete this user?")) {
								deleteUser().catch(err => {
									alert(err.message);
								});
							}
						}}
					>
						{this.props.children}
					</button>
				)}
			</Mutation>
		);
	}
}
