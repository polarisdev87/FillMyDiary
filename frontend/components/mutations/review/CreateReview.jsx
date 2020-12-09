import gql from "graphql-tag";

const CREATE_REVIEW_MUTATION = gql`
	mutation CREATE_REVIEW_MUTATION(
		$fieldOne: Boolean
		$fieldTwo: Boolean
		$fieldThree: Boolean
		$job: ID
		$reviewer: String!
		$score: Int!
		$type: String!
	) {
		createReview(
			fieldOne: $fieldOne
			fieldTwo: $fieldTwo
			fieldThree: $fieldThree
			job: $job
			reviewer: $reviewer
			score: $score
			type: $type
		) {
			id
		}
	}
`;

export { CREATE_REVIEW_MUTATION };
