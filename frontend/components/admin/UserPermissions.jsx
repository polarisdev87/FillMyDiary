import React, { Component } from "react";
import PropTypes from "prop-types";
import { ApolloConsumer, Mutation, Query } from "react-apollo";
import styled from "styled-components";
import Downshift from "downshift";
import debounce from "lodash.debounce";
import moment from "moment";
import "moment/locale/en-gb";

import { UPDATE_USER_PERMISSIONS_MUTATION } from "../mutations/admin/UpdateUserPermissions";

import { ALL_USERS_QUERY } from "../queries/user/AllUsers";
import { SEARCH_USERS_QUERY } from "../queries/user/SearchUsers";
import { USERS_TO_REVIEW_QUERY } from "../queries/user/UsersToReview";

import CurrentUser from "../queries/user/CurrentUser";

import DeleteUser from "../users/DeleteUser";

import Link from "../atomic/atoms/Link";

import ErrorMessage from "../atomic/molecules/ErrorMessage";
import LoaderCircle from "../atomic/molecules/loader/LoaderCircle";

import UserManagement from "../../pages/admin-manager/user-management";

const errorNoUser = {
	message: "Please log in to view the contents of the page."
};

const UserManagementContainer = styled.section`
	header {
		align-items: flex-end;
		display: flex;
		justify-content: space-between;
		margin-bottom: 32px;

		h1 {
			margin: 0;
		}
	}
`;

const SearchUser = styled.section`
	display: flex;
	flex-direction: row-reverse;
	justify-content: flex-start;

	button + button {
		margin-right: 8px;
		margin-top: 0;
	}

	input {
		margin-right: 8px;
		padding-left: 16px;
		padding-right: 16px;
	}
`;

const Table = styled.table`
	a {
		text-decoration: none;
	}

	button {
		display: block;
	}

	label {
		margin: 0;
		padding: 16px;

		cursor: pointer;
	}

	td {
		min-width: 0px;
		position: relative;

		label {
			align-items: center;
			display: flex;
			height: 100%;
			justify-content: center;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
		}
	}

	.text--break {
		word-break: break-all;
	}
`;

const possiblePermissions = ["ADMIN", "USER"];

class UserPermissions extends Component {
	state = {
		focusedInput: null,
		users: [],
		initalised: false,
		loading: false,
		reviewing: false,
		searching: false
	};

	initialUsers = users => {
		this.setState({ users: users });
		this.setState({ initalised: true });
	};

	onChange = debounce(async (e, client) => {
		// Turn loading on
		this.setState({ loading: true });
		// Manually query apollo client
		const res = await client.query({
			query: SEARCH_USERS_QUERY,
			variables: {
				needle: e.target.value
			}
		});
		this.setState({ users: res.data.users, loading: false });
	}, 350);

	toggleReviewing = e => {
		this.setState({ reviewing: !this.state.reviewing });
		this.setState({ searching: false });
	};

	toggleSearching = e => {
		this.setState({ reviewing: false });
		this.setState({ searching: !this.state.searching });
	};

	render() {
		const { currentuser } = this.props;

		return (
			<UserManagementContainer>
				<header>
					<h1>User Management</h1>
					<SearchUser>
						<button onClick={this.toggleReviewing}>
							{this.state.reviewing && "Stop"} Review
							{this.state.reviewing && "ing"}
						</button>
						<button onClick={this.toggleSearching}>
							{this.state.searching && "Stop"} Search
							{this.state.searching && "ing"}
						</button>
						{this.state.searching && (
							<ApolloConsumer>
								{client => (
									<input
										type="search"
										onChange={e => {
											e.persist();
											this.onChange(e, client);
										}}
										placeholder="Search for a User"
									/>
								)}
							</ApolloConsumer>
						)}
					</SearchUser>
				</header>
				{this.state.searching && (
					<Table className="table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Telephone</th>
								<th>Business Name</th>
								<th>Created On</th>
								{possiblePermissions.map(permission => (
									<th key={permission}>{permission}</th>
								))}
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{this.state.users.map(user => (
								<UserPermission
									currentuser={currentuser}
									user={user}
									key={user.id}
								/>
							))}
						</tbody>
					</Table>
				)}
				{this.state.reviewing && (
					<Query
						fetchPolicy="network-only"
						query={USERS_TO_REVIEW_QUERY}
						variables={{ date: moment().startOf("day") }}
					>
						{({ data, loading, error }) => {
							if (loading) return <LoaderCircle />;
							if (error) <ErrorMessage error={error} />;
							if (!data) return null;
							if (!loading && data && this.state.initalised)
								this.initialUsers(data.users);
							return (
								<React.Fragment>
									<ErrorMessage error={error} />
									<Table className="table">
										<thead>
											<tr>
												<th>Name</th>
												<th>Email</th>
												<th>Reference(s)</th>
												<th>Date to Review</th>
												<th>Created On</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{data.users.map(user => (
												<tr>
													<td title={user.id}>
														<Link href={`/user?id=${user.id}`}>
															<a>{user.name}</a>
														</Link>
													</td>
													<td className="text--break">{user.email}</td>
													{user.manualReferences ? (
														<td className="text--break">
															<div>{user.manualReferenceOne}</div>
															<div>{user.manualReferenceTwo}</div>
															<div>{user.manualReferenceThree}</div>
														</td>
													) : (
														<td className="text--break">
															<a href={user.referenceOne} target="_blank">
																{user.referenceOne}
															</a>
														</td>
													)}
													<td>
														{moment(user.dateReview).format("DD/MM/YYYY")}
													</td>
													<td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
													<td>
														<Link
															classList="button button--secondary"
															href={{
																pathname: "edit-user",
																query: { id: user.id }
															}}
														>
															<a>Edit User</a>
														</Link>
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</React.Fragment>
							);
						}}
					</Query>
				)}
				{this.state.searching === false && this.state.reviewing === false && (
					<Query query={ALL_USERS_QUERY}>
						{({ data, loading, error }) => {
							if (loading) return <LoaderCircle />;
							if (error) <ErrorMessage error={error} />;
							if (!data) return null;
							if (!loading && data && this.state.initalised)
								this.initialUsers(data.users);
							return (
								<React.Fragment>
									<ErrorMessage error={error} />
									<Table className="table">
										<thead>
											<tr>
												<th>Name</th>
												<th>Email</th>
												<th>Telephone</th>
												<th>Business Name</th>
												<th>Created On</th>
												{possiblePermissions.map(permission => (
													<th key={permission}>{permission}</th>
												))}
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{data.users.map(user => (
												<UserPermission
													currentuser={currentuser}
													user={user}
													key={user.id}
												/>
											))}
										</tbody>
									</Table>
								</React.Fragment>
							);
						}}
					</Query>
				)}
			</UserManagementContainer>
		);
	}
}

class UserPermission extends Component {
	static propTypes = {
		user: PropTypes.shape({
			name: PropTypes.string,
			email: PropTypes.string,
			id: PropTypes.string,
			permissions: PropTypes.array
		}).isRequired
	};

	state = {
		permissions: this.props.user.permissions
	};

	handlePermissionChange = e => {
		const checkbox = e.target;
		let updatedPermissions = [...this.state.permissions];
		if (checkbox.checked) {
			updatedPermissions.push(checkbox.value);
		} else {
			updatedPermissions = updatedPermissions.filter(
				permission => permission !== checkbox.value
			);
		}
		this.setState({ permissions: updatedPermissions });
	};

	render() {
		const { currentuser, user } = this.props;

		return (
			<Mutation
				mutation={UPDATE_USER_PERMISSIONS_MUTATION}
				variables={{
					permissions: this.state.permissions,
					userId: this.props.user.id
				}}
			>
				{(updatePermissions, { loading, error }) => (
					<>
						{error && (
							<tr>
								<td>
									<ErrorMessage error={error} />
								</td>
							</tr>
						)}
						<tr>
							<td title={user.id}>
								<Link href={`/user?id=${user.id}`}>
									<a>{user.name}</a>
								</Link>
							</td>
							<td className="text--break">{user.email}</td>
							<td>{user.telephone}</td>
							<td>{user.businessName}</td>
							<td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
							{possiblePermissions.map(permission => (
								<td key={permission}>
									<label htmlFor={`${user.id}-permission-${permission}`}>
										<input
											id={`${user.id}-permission-${permission}`}
											type="checkbox"
											checked={this.state.permissions.includes(permission)}
											value={permission}
											onChange={this.handlePermissionChange}
										/>
									</label>
								</td>
							))}
							<td>
								{currentuser.id !== user.id && (
									<button
										type="button"
										disabled={loading}
										onClick={updatePermissions}
									>
										Updat{loading ? "ing" : "e"} User
									</button>
								)}
								<Link
									classList="button button--secondary"
									href={{
										pathname: "edit-user",
										query: { id: user.id }
									}}
								>
									<a>Edit User</a>
								</Link>
								{currentuser.id !== user.id && (
									<DeleteUser id={user.id}>Delete User</DeleteUser>
								)}
							</td>
						</tr>
					</>
				)}
			</Mutation>
		);
	}
}

export default UserPermissions;
