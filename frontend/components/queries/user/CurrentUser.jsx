import React, { Component } from "react";
import gql from "graphql-tag";
import propTypes from "prop-types";
import { Query } from "react-apollo";

const CURRENT_USER_QUERY = gql`
	query {
		me {
			id
			applications {
				id
				createdAt
				open
				successful
			}
			approved
			city
			email
			name
			openApplications
			postcode
			permissions
			trades {
				id
				name
				slug
			}
		}
	}
`;

const CurrentUser = props => (
	<Query {...props} query={CURRENT_USER_QUERY}>
		{payload => props.children(payload)}
	</Query>
);

CurrentUser.propTypes = {
	children: propTypes.func.isRequired
};

export default CurrentUser;
export { CURRENT_USER_QUERY };
