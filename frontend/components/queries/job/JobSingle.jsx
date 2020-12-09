import gql from "graphql-tag";

const SINGLE_JOB_QUERY = gql`
	query SINGLE_JOB_QUERY($id: ID!) {
		job(where: { id: $id }) {
			id
			address
			additional
			applications {
				user {
					id
				}
			}
			certifications
			days
			description
			endDate
			latitude
			longitude
			paymentType
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
			user {
				id
			}
		}
	}
`;

export { SINGLE_JOB_QUERY };
