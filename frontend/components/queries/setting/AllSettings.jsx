import gql from "graphql-tag";

const ALL_SETTINGS_QUERY = gql`
	query ALL_SETTINGS_QUERY {
		settings {
			id
			setting
			value
		}
	}
`;
export { ALL_SETTINGS_QUERY };
