import gql from "graphql-tag";

const DELETE_APPLICATION_MUTATION = gql`
	mutation DELETE_APPLICATION_MUTATION($id: ID!) {
		deleteApplication(id: $id) {
			id
		}
	}
`;

export { DELETE_APPLICATION_MUTATION };
