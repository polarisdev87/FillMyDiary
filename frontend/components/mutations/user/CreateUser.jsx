import gql from "graphql-tag";

const CREATE_USER_MUTATION = gql`
	mutation CREATE_USER_MUTATION(
		$address: String
		$businessName: String
		$certifications: String
		$city: String
		$coupon: String
		$email: String!
		$jobNotifications: Int
		$latitude: String
		$longitude: String
		$manualReferences: Boolean
		$manualReferenceOne: String
		$manualReferenceTwo: String
		$manualReferenceThree: String
		$name: String!
		$password: String!
		$postcode: String
		$referenceOne: String
		$telephone: String!
		$trades: [ID!]!
		$token: String
		$town: String
		$website: String
	) {
		createUser(
			address: $address
			businessName: $businessName
			certifications: $certifications
			city: $city
			coupon: $coupon
			email: $email
			jobNotifications: $jobNotifications
			latitude: $latitude
			longitude: $longitude
			manualReferences: $manualReferences
			manualReferenceOne: $manualReferenceOne
			manualReferenceTwo: $manualReferenceTwo
			manualReferenceThree: $manualReferenceThree
			name: $name
			password: $password
			postcode: $postcode
			referenceOne: $referenceOne
			telephone: $telephone
			token: $token
			town: $town
			trades: $trades
			website: $website
		) {
			id
			email
			name
		}
	}
`;

export { CREATE_USER_MUTATION };
