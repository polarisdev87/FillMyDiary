import gql from "graphql-tag";

const ALL_APPLICATIONS_QUERY = gql`
	query ALL_APPLICATIONS_QUERY {
		applications {
			createdAt
		}
	}
`;
export { ALL_APPLICATIONS_QUERY };
