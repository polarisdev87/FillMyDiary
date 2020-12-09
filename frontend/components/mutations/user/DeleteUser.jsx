import gql from "graphql-tag";

const DELETE_USER_MUTATION = gql`
	mutation DELETE_USER_MUTATION($id: ID!) {
		deleteUser(id: $id) {
			id
		}
	}
`;

export { DELETE_USER_MUTATION };
