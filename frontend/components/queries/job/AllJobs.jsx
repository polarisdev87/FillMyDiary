import gql from "graphql-tag";

const ALL_JOBS_QUERY = gql`
	query ALL_JOBS_QUERY {
		jobs(orderBy: createdAt_DESC) {
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
export { ALL_JOBS_QUERY };
