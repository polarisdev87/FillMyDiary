import React, { Component } from "react";

import UserInformationStyles from "./styles/UserInformationStyles";

import UserLogout from "../../UserLogout";

import IconCheckCircle from "../../../../assets/icons/fa/check-circle.svg";
import IconUser from "../../../../assets/icons/fa/user.svg";

import Link from "../../../atomic/atoms/Link";

export default class SingleUser extends Component {
	capitalize(s) {
		s = s.toLowerCase();
		return s[0].toUpperCase() + s.slice(1);
	}

	addHTTPS(url) {
		const linkURL = url.indexOf("://") === -1 ? "https://" + url : url;

		return linkURL;
	}

	render() {
		const { me, user } = this.props;

		const website = user.website ? this.addHTTPS(user.website) : undefined;
		const referenceLink = user.referenceOne
			? this.addHTTPS(user.referenceOne)
			: undefined;

		return (
			<UserInformationStyles>
				<div className="user__avatar">
					<IconUser />
				</div>
				<h1>{user.name}</h1>
				<h2>
					{user.trades.map((trade, index) => (
						<span index={index} key={trade.id}>
							{trade.name}
						</span>
					))}
				</h2>
				<p>
					Fill out the following details to post your job for free – only
					registered and verified tradesmen in your area will be able to view
					and apply for the job.
				</p>
				<hr />
				<ul>
					<li>{user.telephone}</li>
					<li className="text--wrap">{user.email}</li>
					{website && (
						<li>
							<a href={website} target="_blank">
								{website}
							</a>
						</li>
					)}
					{user.manualReferences && (
						<li className="user__approved" title="Manually Approved">
							Fill My Diary Verified
							<IconCheckCircle />
						</li>
					)}
					{referenceLink && (
						<li>
							<a href={referenceLink} target="_blank">
								{referenceLink}
							</a>
						</li>
					)}
					<li>{user.certifications}</li>
				</ul>
				{me && me.id === user.id && (
					<>
						<Link
							classList="button button--secondary"
							href={{
								pathname: "/user/update",
								query: { id: me.id }
							}}
						>
							<a>Edit Profile Information</a>
						</Link>
						<Link
							classList="button button--secondary"
							href={{
								pathname: "/user/orders",
								query: { id: me.id }
							}}
						>
							<a>My Orders</a>
						</Link>
						<UserLogout />
					</>
				)}
			</UserInformationStyles>
		);
	}
}
