import gql from "graphql-tag";

const UPDATE_JOB_MUTATION = gql`
	mutation UPDATE_JOB_MUTATION(
		$additional: String
		$address: String
		$certifications: String
		$days: Int
		$description: String
		$endDate: DateTime
		$id: ID!
		$latitude: String
		$longitude: String
		$paymentType: String
		$postcode: String
		$price: Int
		$startDate: DateTime
		$title: String
		$trades: [ID]
	) {
		updateJob(
			additional: $additional
			address: $address
			certifications: $certifications
			days: $days
			description: $description
			endDate: $endDate
			id: $id
			latitude: $latitude
			longitude: $longitude
			paymentType: $paymentType
			postcode: $postcode
			price: $price
			startDate: $startDate
			title: $title
			trades: $trades
		) {
			id
		}
	}
`;

export { UPDATE_JOB_MUTATION };
