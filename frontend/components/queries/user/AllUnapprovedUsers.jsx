import gql from "graphql-tag";

const ALL_UNAPPROVED_USERS_QUERY = gql`
	query ALL_UNAPPROVED_USERS_QUERY {
		users(where: { approved: false }) {
			id
			address
			approved
			businessName
			certifications
			city
			coupon
			createdAt
			email
			manualReferences
			manualReferenceOne
			manualReferenceTwo
			manualReferenceThree
			name
			postcode
			referenceOne
			telephone
			town
			trades {
				id
				name
			}
			website
		}
	}
`;

export { ALL_UNAPPROVED_USERS_QUERY };
