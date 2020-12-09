import gql from "graphql-tag";

const USER_APPLICATIONS_SUCCESSFUL_QUERY = gql`
	query USER_APPLICATIONS_SUCCESSFUL_QUERY($id: ID!) {
		applications(where: { job: { id: $id }, successful: true }) {
			id
			job {
				id
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

export { USER_APPLICATIONS_SUCCESSFUL_QUERY };
