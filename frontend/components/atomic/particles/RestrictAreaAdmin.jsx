import { Query } from "react-apollo";

import ErrorMessage from "../molecules/ErrorMessage";
import LoaderCircle from "../molecules/loader/LoaderCircle";

import { CURRENT_USER_QUERY } from "../../queries/user/CurrentUser";

const errorNoUser = {
	message: "Please log in to view the contents of the page."
};
const errorUnapproved = {
	message:
		"You are not an administrator, and don't have permission to view the contents of the page."
};

export default class RestrictAreaAdmin extends React.Component {
	render() {
		return (
			<Query query={CURRENT_USER_QUERY}>
				{({ data, loading }) => {
					if (loading) return <LoaderCircle />;
					if (!data.me) {
						return (
							<>
								<ErrorMessage error={errorNoUser} />
							</>
						);
					}
					if (!data.me.permissions.includes("ADMIN")) {
						return (
							<>
								<ErrorMessage error={errorUnapproved} />
							</>
						);
					}
					if (data.me) {
						const childrenWithExtraProp = React.Children.map(
							this.props.children,
							child => {
								return React.cloneElement(child, {
									currentuser: data.me
								});
							}
						);

						return childrenWithExtraProp;
					}
					return this.props.children;
				}}
			</Query>
		);
	}
}
