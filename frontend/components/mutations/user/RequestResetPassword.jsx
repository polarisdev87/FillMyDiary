import gql from "graphql-tag";

const REQUEST_RESET_PASSWORD_MUTATION = gql`
	mutation REQUEST_RESET_PASSWORD_MUTATION($email: String!) {
		requestReset(email: $email) {
			message
		}
	}
`;

export { REQUEST_RESET_PASSWORD_MUTATION };
