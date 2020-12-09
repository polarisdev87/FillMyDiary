import gql from "graphql-tag";

const APPLICATION_USERS_QUERY = gql`
	query APPLICATION_USERS_QUERY($id: ID!) {
		applications(where: { job: { id: $id } }) {
			id
			job {
				id
				stage
				user {
					id
				}
			}
			user {
				id
				businessName
				certifications
				city
				email
				manualReferences
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

export { APPLICATION_USERS_QUERY };
