import gql from "graphql-tag";

const JOBS_AVAILABLE_QUERY = gql`
	query JOBS_AVAILABLE_QUERY($date: DateTime) {
		jobs(
			where: {
				AND: [
					{ applications_none: { successful: true } }
					{ startDate_gte: $date }
				]
			}
		) {
			id
			description
			days
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

export { JOBS_AVAILABLE_QUERY };
