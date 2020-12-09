import gql from "graphql-tag";

const CREATE_JOB_MUTATION = gql`
	mutation CREATE_JOB_MUTATION(
		$additional: String
		$address: String
		$certifications: String
		$days: Int
		$description: String
		$endDate: DateTime
		$latitude: String
		$longitude: String
		$paymentType: String
		$postcode: String
		$price: Int
		$startDate: DateTime
		$title: String
		$trades: [ID!]!
	) {
		createJob(
			additional: $additional
			address: $address
			certifications: $certifications
			days: $days
			description: $description
			endDate: $endDate
			latitude: $latitude
			longitude: $longitude
			paymentType: $paymentType
			postcode: $postcode
			price: $price
			startDate: $startDate
			stage: "CREATED"
			title: $title
			trades: $trades
		) {
			id
		}
	}
`;

export { CREATE_JOB_MUTATION };
