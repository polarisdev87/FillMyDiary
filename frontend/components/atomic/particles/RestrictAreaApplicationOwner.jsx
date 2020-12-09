import React, { Component } from "react";
import { Query } from "react-apollo";

import { CURRENT_USER_QUERY } from "../../queries/user/CurrentUser";

import ErrorMessage from "../molecules/ErrorMessage";
import LoaderCircle from "../molecules/loader/LoaderCircle";
import SuccessMessage from "../molecules/SuccessMessage";

const errorNoUser = {
	message: "Please log in to view the contents of the page."
};

const errorUnapproved = {
	message:
		"Your account is awaiting approval, once approved you can view the contents of the page."
};

const errorDifferentUser = {
	message: "You are trying to view content that is intended for another user 👀"
};

export default class RestrictAreaApplicationOwner extends Component {
	render() {
		return (
			<React.Fragment>
				<Query query={CURRENT_USER_QUERY}>
					{({ data, loading }) => {
						if (loading) return <LoaderCircle />;
						if (!data.me) {
							return <ErrorMessage error={errorNoUser} />;
						}
						if (!data.me.approved) {
							return <ErrorMessage error={errorUnapproved} />;
						}
						if (data.me.id !== this.props.id) {
							return <ErrorMessage error={errorDifferentUser} />;
						}
						return this.props.children;
					}}
				</Query>
			</React.Fragment>
		);
	}
}
