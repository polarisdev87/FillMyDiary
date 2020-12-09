import gql from "graphql-tag";

const UPDATE_SETTING_MUTATION = gql`
	mutation UPDATE_SETTING_MUTATION($id: ID!, $value: String!) {
		updateSetting(id: $id, value: $value) {
			id
		}
	}
`;

export { UPDATE_SETTING_MUTATION };
