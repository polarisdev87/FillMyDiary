import React, { Component } from "react";
import styled from "styled-components";

import { getWordPressData } from "../../../../../commonFunctions";
import { device } from "../../../../../lib/MediaQueries";

import UserApplications from "./parts/applications/UserApplications";
import UserAvailableJobs from "./parts/available/UserAvailableJobs";
import UserCreatedJobs from "./parts/created/UserCreatedJobs";
import UserCompleteJobs from "./parts/complete/UserCompleteJobs";
import UserJobsToReview from "./parts/review/UserJobsToReview";

import OutstandingJob from "../../../../jobs/actions/OutstandingJob";

const UserContentElement = styled.section`
	margin-top: 64px;

	border-radius: 8px;

	nav {
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-bottom: 32px;

		background-color: ${props =>
			props.theme.white ? props.theme.white : "#FFF"};
		box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);

		@media ${device.md} {
			flex-direction: row;
		}

		button {
			border-radius: 0px;
			margin: 0;
			width: 100%;

			background: #e5e9f1;
			color: #737373;
			font-size: 14px;
			font-style: normal;
			font-weight: 500;
			line-height: 21px;
			text-align: center;

			&:hover {
				background: #e5e9f1;
				color: #141213;
			}

			&:first-of-type {
				border-radius: 8px 0 0 8px;
			}
			&:last-of-type {
				border-radius: 0 8px 8px 0;
			}
		}

		.button--notification {
			&:after {
				align-items: center;
				border-radius: 50%;
				content: attr(data-notifications);
				display: inline-flex;
				height: 24px;
				justify-content: center;
				margin-left: 8px;
				width: 24px;

				background: blue;
				color: white;
			}
		}

		.active {
			background: none;
			color: #141213;

			&:hover {
				background: none;
			}
		}
	}

	section {
		display: none;

		&.active {
			display: block;
		}
	}
`;

export default class UserContent extends Component {
	state = {
		notifications: {
			applications: {
				count: 0
			},
			available: {
				count: 0
			},
			completed: {
				count: 0
			},
			created: {
				count: 0
			},
			reviews: {
				count: 0
			}
		},
		outstanding: false,
		outstandingJobs: [],
		pagination: 10,
		tabIndex: 1
	};

	changeTab = (e, tabIndex) => {
		this.setState({ tabIndex: tabIndex });
	};

	createClasses(index, indexButton, notificationCount) {
		var classList = ``;
		index === indexButton
			? (classList = classList + `active`)
			: (classList = classList + `inactive`);

		if (notificationCount > 0) {
			classList = classList + ` button--notification`;
		}

		return classList;
	}

	createNotification = (type, count, operation) => {
		var notifications;
		const prevNotifications = this.state.notifications;

		notifications = prevNotifications;
		notifications[type].count = count;

		this.setState({ notifications });
	};

	lockAccount = outstandingArray => {
		this.setState({
			outstanding: true,
			outstandingJobs: outstandingArray
		});
	};

	render() {
		const { me, user } = this.props;
		const { outstanding, outstandingJobs, tabIndex } = this.state;

		if (!outstanding) {
			const outstandingArray = user.jobs.filter(
				job => job.stage === `OUTSTANDING`
			);
			if (outstandingArray.length > 0) {
				this.lockAccount(outstandingArray);
			}
		}

		return (
			<>
				<UserContentElement>
					<nav>
						<button
							className={this.createClasses(
								tabIndex,
								1,
								this.state.notifications.available.count
							)}
							data-notifications={this.state.notifications.available.count}
							value="Available Jobs"
							onClick={e => this.changeTab(e, 1)}
							disabled={outstanding}
						>
							Available Jobs
						</button>
						<button
							className={this.createClasses(
								tabIndex,
								2,
								this.state.notifications.created.count
							)}
							data-notifications={this.state.notifications.created.count}
							value="Your Jobs"
							onClick={e => this.changeTab(e, 2)}
							disabled={outstanding}
						>
							Your Jobs
						</button>
						<button
							className={this.createClasses(
								tabIndex,
								3,
								this.state.notifications.applications.count
							)}
							data-notifications={this.state.notifications.applications.count}
							value="Your Applications"
							onClick={e => this.changeTab(e, 3)}
							disabled={outstanding}
						>
							Your Applications
						</button>
						<button
							className={this.createClasses(
								tabIndex,
								4,
								this.state.notifications.reviews.count
							)}
							data-notifications={this.state.notifications.reviews.count}
							value="Jobs To Review"
							onClick={e => this.changeTab(e, 4)}
							disabled={outstanding}
						>
							Jobs To Review
						</button>
						<button
							className={this.createClasses(
								tabIndex,
								5,
								this.state.notifications.completed.count
							)}
							data-notifications={this.state.notifications.completed.count}
							value="Completed Jobs"
							onClick={e => this.changeTab(e, 5)}
							disabled={outstanding}
						>
							Completed Jobs
						</button>
					</nav>
				</UserContentElement>
				{outstanding && (
					<UserContentOutstanding
						outstandingJobs={outstandingJobs}
						user={user}
					/>
				)}
				{tabIndex === 1 && (
					<UserAvailableJobs
						me={me}
						pagination={this.state.pagination}
						user={user}
						createNotification={this.createNotification}
					/>
				)}
				{tabIndex === 2 && (
					<UserCreatedJobs
						me={me}
						pagination={this.state.pagination}
						user={user}
						createNotification={this.createNotification}
					/>
				)}
				{tabIndex === 3 && (
					<UserApplications
						me={me}
						pagination={this.state.pagination}
						user={user}
						createNotification={this.createNotification}
					/>
				)}
				{tabIndex === 4 && (
					<UserJobsToReview
						me={me}
						pagination={this.state.pagination}
						user={user}
						createNotification={this.createNotification}
					/>
				)}
				{tabIndex === 5 && (
					<UserCompleteJobs
						me={me}
						pagination={this.state.pagination}
						user={user}
						createNotification={this.createNotification}
					/>
				)}
			</>
		);
	}
}

const UserContentOutstandingElement = styled.section`
	border-radius: 8px;
	margin-top: 16px;
	padding: 16px 32px;

	background-color: #ffffff;
	box-shadow: 0px 2px 12px rgba(20, 18, 19, 0.05);
`;

class UserContentOutstanding extends Component {
	state = {
		options: {}
	};

	gettingMenus = false;

	async componentDidMount() {
		let optionsData = await this.menusWordPress();

		if (this.gettingMenus) {
			this.setState({
				options: optionsData
			});
		}
	}

	componentWillUnmount() {
		this.gettingMenus = false;
	}

	async menusWordPress() {
		this.gettingMenus = true;

		const optionsData = await getWordPressData(`options/v2/all`);

		return optionsData;
	}

	render() {
		const { outstandingJobs, removeOutstanding, user } = this.props;

		return (
			<UserContentOutstandingElement>
				{!this.state.options.builder_lockout_message ? (
					<>
						<h3>Your Account Is Temporarily Locked</h3>
						<p>
							We’ve disabled the ability to add, remove and manage jobs as we’ve
							detected that you posted a job and had applicant(s) apply for the
							job, but did not confirm an applicant before the job start date.
						</p>
						<p>
							To continue using our application, you will need to pay a service
							fee.
						</p>
					</>
				) : (
					<div
						dangerouslySetInnerHTML={{
							__html: this.state.options.builder_lockout_message
						}}
					/>
				)}
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Postcode</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{outstandingJobs.map(job => {
							return (
								<tr key={job.id}>
									<td>{job.title}</td>
									<td>{job.postcode}</td>
									<td>Outstanding</td>
									<td>
										<OutstandingJob job={job} user={user} />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</UserContentOutstandingElement>
		);
	}
}
