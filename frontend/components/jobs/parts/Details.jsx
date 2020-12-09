import React, { Component } from "react";
import { Row, Col } from "react-grid-system";

import Address from "./Address";

import Message from "../../atomic/molecules/message/Message";

export default class Dates extends Component {
	render() {
		const { address, postcode, suggestionSelected } = this.props;

		return (
			<Row>
				<Col lg={6}>
					<h2>
						{this.props.content && this.props.content["heading_three"].value}
					</h2>
					{this.props.content && (
						<p
							dangerouslySetInnerHTML={{
								__html: this.props.content["paragraph_three"].value
							}}
						/>
					)}
				</Col>
				<Col lg={5} offset={{ lg: 1 }}>
					{suggestionSelected && postcode === "" && (
						<Message>
							<p>We couldn't find a postcode from the address: {address}</p>
							<p className="text--bold">Try entering the address postcode</p>
						</Message>
					)}
					<Address
						getLabel={this.props.getLabel}
						handleInputChange={this.props.handleInputChange}
						handleSelectSuggest={this.props.handleSelectSuggest}
						location={this.props.location}
						postcode={this.props.postcode}
						required={true}
						search={this.props.search}
						value={this.props.value}
					/>
					<label htmlFor="description">
						{this.props.getLabel(4, `Description`)}
					</label>
					<textarea
						id="description"
						name="description"
						required
						value={this.props.description}
						onChange={this.props.handleChange}
					/>
					<label htmlFor="certifications">
						{this.props.getLabel(5, `Certifications Required (Optional)`)}
					</label>
					<input
						type="text"
						id="certifications"
						name="certifications"
						value={this.props.certifications}
						onChange={this.props.handleChange}
					/>
					<label htmlFor="additional">
						{this.props.getLabel(6, `Additional Information`)}
					</label>
					<textarea
						id="additional"
						name="additional"
						value={this.props.additional}
						onChange={this.props.handleChange}
					/>
				</Col>
			</Row>
		);
	}
}
