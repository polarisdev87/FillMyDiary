import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";

import FancyCheckboxes from "../../styles/FancyCheckboxes";

export default class UserSearch extends Component {
	render() {
		return (
			<>
				<label>User</label>
				<ApolloConsumer>
					{client => (
						<input
							type="search"
							onChange={e => {
								e.persist();
								this.props.onChange(e, client);
							}}
							placeholder="Search for a User"
						/>
					)}
				</ApolloConsumer>
				<FancyCheckboxes>
					<div className="container">
						{this.props.users &&
							this.props.users.map(user => (
								<React.Fragment key={user.id}>
									<input
										checked={this.props.user === user.id}
										id={user.id}
										name="user"
										onChange={this.props.handleChange}
										type="checkbox"
										value={user.id}
									/>
									<label htmlFor={user.id}>
										{user.name}{" "}
										<span className="user__email">({user.email})</span>
									</label>
								</React.Fragment>
							))}
					</div>
				</FancyCheckboxes>
			</>
		);
	}
}
