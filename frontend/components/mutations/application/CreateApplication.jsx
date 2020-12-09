import gql from "graphql-tag";

const CREATE_APPLICATION_MUTATION = gql`
	mutation CREATE_APPLICATION_MUTATION($id: ID!, $token: String!) {
		createApplication(id: $id, token: $token) {
			id
		}
	}
`;

export { CREATE_APPLICATION_MUTATION };
