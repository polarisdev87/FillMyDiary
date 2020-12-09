import gql from "graphql-tag";

const SEARCH_JOBS_BROWSE_QUERY = gql`
	query SEARCH_JOBS_BROWSE_QUERY(
		$date: DateTime
		$dateFilter: DateTime
		$price: Int
		$trade: [ID!]
		$user: ID
	) {
		jobs(
			where: {
				AND: [
					{ applications_none: { successful: true } }
					{ applications_none: { user: { id: $user } } }
					{ price_gte: $price }
					{ startDate_gte: $date }
					{ startDate_lte: $dateFilter }
					{ trades_some: { id_in: $trade } }
				]
			}
		) {
			id
			description
			days
			latitude
			longitude
			postcode
			price
			stage
			startDate
			title
			trades {
				id
				name
				slug
			}
		}
	}
`;

export { SEARCH_JOBS_BROWSE_QUERY };
