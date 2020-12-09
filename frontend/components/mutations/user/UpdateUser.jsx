import gql from "graphql-tag";

const UPDATE_USER_MUTATION = gql`
	mutation UPDATE_USER_MUTATION(
		$address: String
		$businessName: String
		$certifications: String
		$city: String
		$coupon: String
		$dateReview: DateTime
		$email: String
		$id: ID!
		$jobNotifications: Int
		$latitude: String
		$longitude: String
		$manualReferences: Boolean
		$manualReferenceOne: String
		$manualReferenceTwo: String
		$manualReferenceThree: String
		$name: String
		$postcode: String
		$referenceOne: String
		$telephone: String
		$trades: [ID]
		$town: String
		$website: String
	) {
		updateUser(
			address: $address
			businessName: $businessName
			certifications: $certifications
			city: $city
			coupon: $coupon
			dateReview: $dateReview
			email: $email
			id: $id
			jobNotifications: $jobNotifications
			latitude: $latitude
			longitude: $longitude
			manualReferences: $manualReferences
			manualReferenceOne: $manualReferenceOne
			manualReferenceTwo: $manualReferenceTwo
			manualReferenceThree: $manualReferenceThree
			name: $name
			postcode: $postcode
			referenceOne: $referenceOne
			telephone: $telephone
			trades: $trades
			town: $town
			website: $website
		) {
			id
		}
	}
`;

export { UPDATE_USER_MUTATION };
