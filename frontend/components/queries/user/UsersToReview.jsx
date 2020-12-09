import gql from "graphql-tag";

const USERS_TO_REVIEW_QUERY = gql`
	query USERS_TO_REVIEW_QUERY($date: DateTime) {
		users(where: { dateReview_lte: $date }) {
			id
			address
			approved
			businessName
			certifications
			city
			coupon
			createdAt
			dateReview
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
export { USERS_TO_REVIEW_QUERY };
