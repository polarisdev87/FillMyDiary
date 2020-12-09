import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";

import { DELETE_APPLICATION_MUTATION } from "../mutations/application/DeleteApplication";

export default class DeleteApplication extends Component {
	render() {
		return (
			<Mutation
				mutation={DELETE_APPLICATION_MUTATION}
				variables={{ id: this.props.id }}
				update={(cache, payload) => {
					Router.push({
						pathname: `/user`,
						query: { id: this.props.user.id }
					});
				}}
			>
				{(deleteApplication, { error }) => (
					<button
						className="button button--secondary"
						onClick={() => {
							if (
								confirm("Are you sure you want to delete this application?")
							) {
								deleteApplication().catch(err => {
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
