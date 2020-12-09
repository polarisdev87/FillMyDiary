import gql from "graphql-tag";

const DELETE_JOB_MUTATION = gql`
	mutation DELETE_JOB_MUTATION($id: ID!) {
		deleteJob(id: $id) {
			id
		}
	}
`;

export { DELETE_JOB_MUTATION };
