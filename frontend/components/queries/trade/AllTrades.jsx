import gql from "graphql-tag";

const ALL_TRADES_QUERY = gql`
	query ALL_TRADES_QUERY {
		trades(orderBy: name_ASC) {
			id
			name
			slug
		}
	}
`;
export { ALL_TRADES_QUERY };
