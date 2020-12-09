import gql from "graphql-tag";

const SEARCH_USERS_QUERY = gql`
	query SEARCH_USERS_QUERY($needle: String!) {
		users(
			where: {
				OR: [
					{ address: $needle }
					{ businessName_contains: $needle }
					{ certifications_contains: $needle }
					{ city_contains: $needle }
					{ email_contains: $needle }
					{ name_contains: $needle }
					{ postcode_contains: $needle }
					{ telephone_contains: $needle }
					{ town_contains: $needle }
					{ website_contains: $needle }
				]
			}
		) {
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

export { SEARCH_USERS_QUERY };
