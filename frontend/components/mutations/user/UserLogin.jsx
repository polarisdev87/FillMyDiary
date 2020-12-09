import gql from "graphql-tag";

const USER_LOGIN_MUTATION = gql`
	mutation USER_LOGIN_MUTATION($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			id
			email
			name
		}
	}
`;

export { USER_LOGIN_MUTATION };
