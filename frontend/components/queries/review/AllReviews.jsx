import gql from "graphql-tag";

const ALL_REVIEWS_QUERY = gql`
	query ALL_REVIEWS_QUERY {
		reviews {
			createdAt
		}
	}
`;
export { ALL_REVIEWS_QUERY };
