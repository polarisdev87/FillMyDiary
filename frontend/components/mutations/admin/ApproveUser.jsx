import gql from "graphql-tag";

const APPROVE_USER_MUTATION = gql`
	mutation approveUser($userId: ID!) {
		approveUser(userId: $userId) {
			id
			approved
			email
			name
		}
	}
`;

export { APPROVE_USER_MUTATION };
