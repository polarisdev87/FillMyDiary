import gql from "graphql-tag";

const USER_ORDERS_QUERY = gql`
	query USER_ORDERS_QUERY($id: ID!) {
		orders(where: { user: { id: $id }, complete: true }) {
			id
			charge
			total
			complete
			job {
				days
				price
				title
			}
			user {
				id
			}
		}
	}
`;

export { USER_ORDERS_QUERY };
