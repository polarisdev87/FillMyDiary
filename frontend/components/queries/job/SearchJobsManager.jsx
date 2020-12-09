import gql from "graphql-tag";

const SEARCH_JOBS_MANAGER_QUERY = gql`
	query SEARCH_JOBS_MANAGER_QUERY($needle: String!) {
		jobs(
			where: {
				OR: [
					{ additional_contains: $needle }
					{ certifications_contains: $needle }
					{ description_contains: $needle }
					{ paymentType_contains: $needle }
					{ postcode_contains: $needle }
					{ title_contains: $needle }
				]
			}
		) {
			id
			additional
			certifications
			days
			description
			endDate
			paymentType
			postcode
			price
			stage
			startDate
			title
			trades {
				id
				name
			}
			user {
				id
				email
				name
			}
		}
	}
`;

export { SEARCH_JOBS_MANAGER_QUERY };
