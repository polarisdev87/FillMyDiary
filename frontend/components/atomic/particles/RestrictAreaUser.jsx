import React, { Component } from "react";
import { Query } from "react-apollo";

import { CURRENT_USER_QUERY } from "../../queries/user/CurrentUser";

import ErrorMessage from "../molecules/ErrorMessage";
import LoaderCircle from "../molecules/loader/LoaderCircle";

const errorNoUser = {
	message: "Please log in to view the contents of the page."
};
const errorUnapproved = {
	message:
		"Your account is awaiting approval, once approved you can view the contents of the page."
};

export default class RestrictAreaUser extends Component {
	render() {
		const { me } = this.props;

		if (me) {
			if (!me.approved) {
				return (
					<>
						<ErrorMessage error={errorUnapproved} />
					</>
				);
			}
			return this.props.children;
		}

		return (
			<React.Fragment>
				<Query query={CURRENT_USER_QUERY}>
					{({ data, loading }) => {
						if (loading) return <LoaderCircle />;
						if (!data.me) {
							return (
								<>
									<ErrorMessage error={errorNoUser} />
								</>
							);
						}
						if (!data.me.approved) {
							return (
								<>
									<ErrorMessage error={errorUnapproved} />
								</>
							);
						}
						return this.props.children;
					}}
				</Query>
			</React.Fragment>
		);
	}
}
