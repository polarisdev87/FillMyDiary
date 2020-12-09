import gql from "graphql-tag";

const ALL_ORDERS_QUERY = gql`
	query ALL_ORDERS_QUERY {
		orders(where: { complete: true }) {
			id
			charge
			createdAt
			total
		}
	}
`;

export { ALL_ORDERS_QUERY };
