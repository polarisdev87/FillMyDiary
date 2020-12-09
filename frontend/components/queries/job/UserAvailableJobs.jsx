import gql from "graphql-tag";

const USER_AVAILABLE_JOBS_QUERY = gql`
	query USER_AVAILABLE_JOBS_QUERY(
		$date: DateTime
		$id: ID!
		$postcode: String
		$trades: [ID!]
	) {
		jobs(
			orderBy: createdAt_DESC
			where: {
				AND: [
					{ postcode_starts_with: $postcode }
					{ applications_none: { successful: true }, user: { id_not: $id } }
					{ applications_none: { user: { id: $id } } }
					{ startDate_gte: $date }
					{ trades_some: { id_in: $trades } }
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

export { USER_AVAILABLE_JOBS_QUERY };
