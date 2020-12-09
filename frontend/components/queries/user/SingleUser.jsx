import gql from "graphql-tag";

const SINGLE_USER_QUERY = gql`
	query SINGLE_USER_QUERY($id: ID!) {
		user(where: { id: $id }) {
			id
			address
			approved
			businessName
			certifications
			city
			coupon
			dateReview
			email
			jobNotifications
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
			website
			applications {
				id
				createdAt
				open
				successful
				job {
					id
					endDate
					postcode
					reviewedByOwner
					reviewedByWorker
					stage
					title
				}
			}
			jobs {
				id
				additional
				applications {
					id
				}
				certifications
				createdAt
				days
				description
				endDate
				paymentType
				postcode
				price
				reviewedByOwner
				reviewedByWorker
				stage
				startDate
				title
				trades {
					id
					name
					slug
				}
			}
			trades {
				id
				name
				slug
			}
		}
	}
`;

export { SINGLE_USER_QUERY };
