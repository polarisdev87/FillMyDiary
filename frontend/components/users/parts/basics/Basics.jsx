import React, { Component } from "react";
import { Query } from "react-apollo";
import { Row, Col } from "react-grid-system";

import FancyCheckboxes from "../../../styles/FancyCheckboxes";

import HR from "../../../atomic/atoms/HR";
import Link from "../../../atomic/atoms/Link";

import ErrorMessage from "../../../atomic/molecules/ErrorMessage";
import LoaderCircle from "../../../atomic/molecules/loader/LoaderCircle";
import SuccessMessage from "../../../atomic/molecules/SuccessMessage";

import { ALL_TRADES_QUERY } from "../../../queries/trade/AllTrades";

const distanceOptions = [50, 20, 15, 10, 5, 1, 0];

export default class Basics extends Component {
	render() {
		const {
			action,
			admin,
			content,
			coupon,
			email,
			error,
			jobNotifications,
			password,
			handleChange,
			handleTradeChange,
			loading,
			successMessage,
			trades,
			updated
		} = this.props;

		return (
			<Row>
				<Col lg={6}>
					<h1 className="h2">{content && content["heading_one"].value}</h1>
					<ErrorMessage error={error} />
					{updated && <SuccessMessage success={successMessage} />}
					{content && (
						<p
							dangerouslySetInnerHTML={{
								__html: content["paragraph_one"].value
							}}
						/>
					)}
					{action !== "update" ? (
						<Link href="/login" classList="button">
							<a>Already have an account? Login here</a>
						</Link>
					) : (
						<Link
							href="/user/request-password"
							classList="button button--secondary"
						>
							<a>Update Password</a>
						</Link>
					)}
					<HR invisible={true} size={"md"} />
				</Col>
				<Col
					lg={5}
					offset={{
						lg: 1
					}}
				>
					<label htmlFor="email">{this.props.getLabel(1, `Email`)}</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						defaultValue={action === "update" ? email : undefined}
						value={action !== "update" ? email : undefined}
						onChange={handleChange}
					/>
					{action !== "update" && (
						<>
							<label htmlFor="password">
								{this.props.getLabel(2, `Password`)}
							</label>
							<input
								type="password"
								id="password"
								name="password"
								required
								value={password}
								onChange={handleChange}
							/>
						</>
					)}
					<label htmlFor="jobNotifications">
						{jobNotifications === 0 && `Job Notifications are Disabled`}
						{jobNotifications === 1 &&
							`${this.props.getLabel(
								3,
								`Notify of Jobs Within`
							)} ${jobNotifications} Mile`}
						{jobNotifications > 1 &&
							`${this.props.getLabel(
								3,
								`Notify of Jobs Within`
							)} ${jobNotifications} Miles`}
					</label>
					<select
						id="jobNotifications"
						name="jobNotifications"
						onChange={this.props.handleChange}
						defaultValue={action === "update" ? jobNotifications : undefined}
					>
						<option value={100}>Within 100 Miles</option>
						{distanceOptions &&
							distanceOptions.map((distance, index) => (
								<option key={`distance-${distance}`} value={distance}>
									{distance === 0 && `Disable job notifications`}
									{distance === 1 && `Within ${distance} mile`}
									{distance > 1 && `Within ${distance} miles`}
								</option>
							))}
					</select>
					<>
						{(action !== "update" || admin) && (
							<Query query={ALL_TRADES_QUERY}>
								{({ data, loading, error }) => {
									if (loading) return <LoaderCircle />;
									if (error) return <ErrorMessage error={error} />;
									if (!data || !data.trades) return null;
									return (
										<>
											<label>{this.props.getLabel(4, `Your Trade`)}</label>
											<FancyCheckboxes>
												<div className="container">
													{data &&
														data.trades.map(trade => (
															<React.Fragment key={trade.id}>
																<input
																	defaultChecked={
																		action === "update"
																			? trades.some(e => e.id === trade.id)
																			: undefined
																	}
																	checked={
																		action !== "update"
																			? trades.includes(trade.id)
																			: undefined
																	}
																	id={trade.id}
																	onChange={handleTradeChange}
																	type="checkbox"
																	value={trade.id}
																/>
																<label htmlFor={trade.id}>{trade.name}</label>
															</React.Fragment>
														))}
												</div>
											</FancyCheckboxes>
										</>
									);
								}}
							</Query>
						)}
					</>
					{action !== "update" && (
						<>
							<label htmlFor="coupon">
								{this.props.getLabel(5, `Coupon (Optional)`)}
							</label>
							<input
								type="text"
								id="coupon"
								name="coupon"
								value={coupon}
								onChange={handleChange}
							/>
						</>
					)}
				</Col>
			</Row>
		);
	}
}
