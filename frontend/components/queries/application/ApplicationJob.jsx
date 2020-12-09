import gql from "graphql-tag";

const APPLICATION_JOB_QUERY = gql`
	query APPLICATION_JOB_QUERY($id: ID!) {
		job(where: { id: $id }) {
			additional
			certifications
			days
			description
			endDate
			paymentType
			postcode
			price
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

export { APPLICATION_JOB_QUERY };
