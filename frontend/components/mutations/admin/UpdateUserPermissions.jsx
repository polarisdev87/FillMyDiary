import gql from "graphql-tag";

const UPDATE_USER_PERMISSIONS_MUTATION = gql`
	mutation updatedPermissions($permissions: [Permission], $userId: ID!) {
		updatePermissions(permissions: $permissions, userId: $userId) {
			id
			email
			permissions
			name
		}
	}
`;

export { UPDATE_USER_PERMISSIONS_MUTATION };
