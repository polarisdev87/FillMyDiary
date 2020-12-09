import gql from "graphql-tag";

const APPROVE_APPLICAITON_USER_MUTATION = gql`
	mutation acceptApplication($id: ID!, $job: ID!, $user: ID!) {
		acceptApplication(id: $id, job: $job, user: $user) {
			id
		}
	}
`;

export { APPROVE_APPLICAITON_USER_MUTATION };
