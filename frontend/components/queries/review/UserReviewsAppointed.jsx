import gql from "graphql-tag";

const USER_APPOINTED_REVIEWS_QUERY = gql`
	query USER_APPOINTED_REVIEWS_QUERY($id: ID!) {
		reviews(where: { user: { id: $id } }) {
			id
			fieldOne
			fieldTwo
			fieldThree
			job {
				id
				title
			}
			reviewer
			score
			type
			user {
				name
			}
		}
	}
`;

export { USER_APPOINTED_REVIEWS_QUERY };
