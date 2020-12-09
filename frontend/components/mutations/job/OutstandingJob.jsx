import gql from "graphql-tag";

const OUTSTANDING_JOB_MUTATION = gql`
	mutation OUTSTANDING_JOB_MUTATION($id: ID!, $token: String!) {
		outstandingJob(id: $id, token: $token) {
			id
		}
	}
`;

export { OUTSTANDING_JOB_MUTATION };
