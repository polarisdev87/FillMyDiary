import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/en-gb";

import { APPROVE_USER_MUTATION } from "../mutations/admin/ApproveUser";

import { ALL_UNAPPROVED_USERS_QUERY } from "../queries/user/AllUnapprovedUsers";

import Link from "../atomic/atoms/Link";
import HR from "../atomic/atoms/HR";

import ErrorMessage from "../atomic/molecules/ErrorMessage";
import LoaderCircle from "../atomic/molecules/loader/LoaderCircle";

import DeleteUser from "../users/DeleteUser";

const UserApplication = styled.section`
	margin-bottom: 8px;

	background: white;
	border: 1px solid #d9d9d9;

	button + .button {
		margin: 0;
		margin-left: 8px;
	}

	button,
	.button {
		padding: 12px 16px;
	}

	header {
		align-items: flex-start;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 16px;

		border: 1px solid #d9d9d9;
		cursor: pointer;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.1em;
		line-height: 21px;
		text-transform: uppercase;

		@media (min-width: 768px) {
			align-items: center;
			flex-direction: row;
		}
	}

	li {
		+ li {
			margin-top: 16px;
		}
	}

	ul {
		margin: 0;
		padding-left: 0;

		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.1em;
		line-height: 21px;
		list-style: none;
		text-transform: uppercase;
	}

	.header--active + .application__content {
		display: flex;
	}

	.application__content {
		display: none;
		flex-direction: column;
		padding: 16px;

		border: 1px solid #d9d9d9;
		border-top: none;

		@media (min-width: 1024px) {
			flex-direction: row;
			flex-wrap: wrap;
		}
	}

	.application__column {
		@media (min-width: 1024px) {
			padding-bottom: 48px;
			padding-right: 48px;
			width: 50%;
		}
	}

	.application__info {
		margin-bottom: 16px;

		@media (min-width: 768px) {
			margin-bottom: 0;
		}
	}

	header {
		span + span {
			margin-left: 8px;
			padding-left: 8px;

			border-left: 1px solid #141213;
		}
	}
`;

function sameDay(d1, d2) {
	return (
		d1.getFullYear() === d2.getFullYear() &&
		d1.getMonth() === d2.getMonth() &&
		d1.getDate() === d2.getDate()
	);
}

class UserQueue extends Component {
	render() {
		return (
			<Query
				query={ALL_UNAPPROVED_USERS_QUERY}
				fetchPolicy="network-only"
				pollInterval={3600000}
			>
				{({ data, loading, error }) => {
					if (loading) return <LoaderCircle />;
					if (error) return null;
					if (!data) return null;
					return (
						<React.Fragment>
							<ErrorMessage error={error} />
							{data.users.map(user => (
								<UserStatus user={user} key={user.id} />
							))}
						</React.Fragment>
					);
				}}
			</Query>
		);
	}
}

class UserStatus extends Component {
	static propTypes = {
		user: PropTypes.shape({
			approved: PropTypes.bool,
			name: PropTypes.string,
			email: PropTypes.string,
			id: PropTypes.string
		}).isRequired
	};

	state = {
		active: false,
		approved: this.props.user.approved
	};

	handleApprovalChange = e => {
		this.setState({ approved: true });
	};

	handleClick = e => {
		this.setState({ active: !this.state.active });
	};

	render() {
		const user = this.props.user;

		const {
			id,
			address,
			approved,
			businessName,
			certifications,
			city,
			coupon,
			createdAt,
			email,
			manualReferences,
			manualReferenceOne,
			manualReferenceTwo,
			manualReferenceThree,
			name,
			postcode,
			referenceOne,
			telephone,
			town,
			trades,
			website
		} = user;

		const createdAtDate = new Date(createdAt);
		const today = new Date();

		var sameDayBoolean, timeDiff;

		if (sameDay(today, createdAtDate)) {
			sameDayBoolean = true;

			var secs = Math.abs(today - createdAtDate);
			secs = Math.floor(secs / 1e3);

			var h = Math.floor(secs / (60 * 60));

			var divisor_for_minutes = secs % (60 * 60);
			var m = Math.floor(divisor_for_minutes / 60);

			var divisor_for_seconds = divisor_for_minutes % 60;
			var s = Math.ceil(divisor_for_seconds);

			if (s > 0) timeDiff = s + " seconds ago";
			if (m > 0) timeDiff = m + " minutes ago";
			if (h > 0) timeDiff = h + " hours ago";

			timeDiff = "Applied " + timeDiff;
		} else {
			sameDayBoolean = false;
		}

		return (
			<Mutation
				mutation={APPROVE_USER_MUTATION}
				refetchQueries={[{ query: ALL_UNAPPROVED_USERS_QUERY }]}
				variables={{
					userId: this.props.user.id
				}}
				update={this.handleApprovalChange}
			>
				{(approveUser, { loading, error }) => (
					<UserApplication>
						<header
							className={this.state.active ? `header--active` : null}
							onClick={this.handleClick}
						>
							<div className="application__info">
								<span className="application__name">{name}</span>
								<span className="application__createdAt">
									{sameDayBoolean
										? timeDiff
										: moment(createdAt).format("DD/MM/YYYY")}
								</span>
								{manualReferences && (
									<span className="application__type">
										Manual Approval Required
									</span>
								)}
							</div>
							{this.state.approved === false ? (
								<div className="application__actions">
									<button
										type="button"
										disabled={loading}
										onClick={approveUser}
									>
										Approv{loading ? "ing" : "e"} User
									</button>
									<DeleteUser id={id}>Deny User</DeleteUser>
								</div>
							) : (
								<button type="button" disabled={true}>
									Approved User
								</button>
							)}
						</header>
						<div className="application__content">
							{error && <ErrorMessage error={error} />}
							<div className="application__column">
								<ul>
									{trades &&
										trades.map((trade, index) => {
											return <li key={trade.id}>{trade.name}</li>;
										})}
									<li>{businessName}</li>
									<li>{website}</li>
									<li>{certifications}</li>
									<li>{coupon ? coupon : "No coupon code supplied"}</li>
								</ul>
							</div>
							<div className="application__column">
								<ul>
									<li>{address}</li>
									<li>{town}</li>
									<li>{city}</li>
									<li>{postcode}</li>
									<li>{telephone}</li>
									<li>{email}</li>
								</ul>
							</div>
							<div className="application__column">
								<HR size="lg" />
								{manualReferences === false ? (
									<h3>Online References</h3>
								) : (
									<h3>Manual References</h3>
								)}
								<ul>
									{manualReferences === false ? (
										<>
											<li>
												<a href={referenceOne} target="_blank">
													{referenceOne}
												</a>
											</li>
										</>
									) : (
										<>
											<li>{manualReferenceOne}</li>
											<li>{manualReferenceTwo}</li>
											<li>{manualReferenceThree}</li>
										</>
									)}
								</ul>
							</div>
						</div>
					</UserApplication>
				)}
			</Mutation>
		);
	}
}

export default UserQueue;
