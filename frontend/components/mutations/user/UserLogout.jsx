import gql from "graphql-tag";

const LOGOUT_USER_MUTATION = gql`
	mutation LOGOUT_USER_MUTATION {
		logoutUser {
			message
		}
	}
`;

export { LOGOUT_USER_MUTATION };
