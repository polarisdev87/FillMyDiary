import gql from "graphql-tag";

const ALL_USERS_QUERY = gql`
	query ALL_USERS_QUERY {
		users {
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
			permissions
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

export { ALL_USERS_QUERY };
