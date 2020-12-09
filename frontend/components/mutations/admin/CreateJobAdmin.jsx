import gql from "graphql-tag";

const CREATE_JOB_ADMIN_MUTATION = gql`
	mutation CREATE_JOB_ADMIN_MUTATION(
		$additional: String
		$certifications: String
		$days: Int
		$description: String
		$endDate: DateTime
		$paymentType: String
		$postcode: String
		$price: Int
		$startDate: DateTime
		$title: String
		$trades: [ID!]!
		$user: ID!
	) {
		createJobAdmin(
			additional: $additional
			certifications: $certifications
			days: $days
			description: $description
			endDate: $endDate
			paymentType: $paymentType
			postcode: $postcode
			price: $price
			startDate: $startDate
			stage: "CREATED"
			title: $title
			trades: $trades
			user: $user
		) {
			id
		}
	}
`;

export { CREATE_JOB_ADMIN_MUTATION };
