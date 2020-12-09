import gql from "graphql-tag";

const APPLICATION_SINGLE_QUERY = gql`
	query APPLICATION_SINGLE_QUERY($id: ID!) {
		application(where: { id: $id }) {
			id
			successful
			job {
				id
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
				stage
				user {
					id
					email
					telephone
				}
			}
			user {
				id
				businessName
				certifications
				city
				email
				name
				postcode
				referenceOne
				telephone
				town
				website
			}
		}
	}
`;

export { APPLICATION_SINGLE_QUERY };
