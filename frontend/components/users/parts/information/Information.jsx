import React, { Component } from "react";
import { Row, Col } from "react-grid-system";

import Message from "../../../atomic/molecules/message/Message";

import Address from "./parts/Address";

export default class Information extends Component {
	render() {
		const {
			action,
			content,
			name,
			address,
			businessName,
			town,
			city,
			postcode,
			search,
			suggestionSelected,
			telephone,
			value,
			website,
			handleChange,
			handleInputChange,
			handleSelectSuggest
		} = this.props;

		return (
			<Row>
				<Col lg={6}>
					<h2>{content && content["heading_two"].value}</h2>
					{content && (
						<p
							dangerouslySetInnerHTML={{
								__html: content["paragraph_two"].value
							}}
						/>
					)}
				</Col>
				<Col
					lg={5}
					offset={{
						lg: 1
					}}
				>
					<label htmlFor="name">{this.props.getLabel(6, `Name`)}</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						defaultValue={action === "update" ? name : undefined}
						value={action !== "update" ? name : undefined}
						onChange={handleChange}
					/>
					<label htmlFor="businessName">
						{this.props.getLabel(7, `Business Name`)}{" "}
					</label>
					<input
						type="text"
						id="businessName"
						name="businessName"
						required
						defaultValue={action === "update" ? businessName : undefined}
						value={action !== "update" ? businessName : undefined}
						onChange={handleChange}
					/>
					{suggestionSelected && postcode === "" && (
						<Message>
							<p>We couldn't find a postcode from the address: {address}</p>
							<p className="text--bold">Try entering the address postcode</p>
						</Message>
					)}
					<Address
						action={action}
						address={address}
						city={city}
						postcode={postcode}
						search={search}
						town={town}
						value={value}
						onChange={handleChange}
						getLabel={this.props.getLabel}
						handleInputChange={handleInputChange}
						handleSelectSuggest={handleSelectSuggest}
					/>
					<label htmlFor="telephone">
						{this.props.getLabel(9, `Telephone`)}
					</label>
					<input
						type="text"
						id="telephone"
						pattern="^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$"
						title="Please enter a valid UK phone number"
						name="telephone"
						required
						defaultValue={action === "update" ? telephone : undefined}
						value={action !== "update" ? telephone : undefined}
						onChange={handleChange}
					/>
					<label htmlFor="website">
						{this.props.getLabel(10, `Website (Optional)`)}
					</label>
					<input
						type="text"
						id="website"
						name="website"
						title="Please enter a valid website"
						defaultValue={action === "update" ? website : undefined}
						value={action !== "update" ? website : undefined}
						onChange={handleChange}
					/>
				</Col>
			</Row>
		);
	}
}
