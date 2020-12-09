import gql from "graphql-tag";

const USER_APPLICATIONS_QUERY = gql`
	query USER_APPLICATIONS_QUERY($id: ID!) {
		applications(
			where: {
				user: { id: $id }
				job: { stage_not_contains: "JOBREVIEWED" }
				OR: [{ open: true }, { successful: true }]
			}
		) {
			id
			createdAt
			open
			successful
			job {
				id
				postcode
				stage
				title
			}
		}
	}
`;

export { USER_APPLICATIONS_QUERY };
