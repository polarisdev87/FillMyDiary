import React, { Component } from "react";
import TagsInput from "react-tagsinput";
import { Container, Row, Col } from "react-grid-system";

import "../../../../assets/scss/reacttags.scss"; // If using WebPack and style-loader.

import Message from "../../../atomic/molecules/message/Message";

export default class Qualifications extends Component {
	render() {
		const { content, handleCertificationsChange, certifications } = this.props;

		return (
			<Row>
				<Col lg={6}>
					<h2>{content && content["heading_three"].value}</h2>
					{content && (
						<p
							dangerouslySetInnerHTML={{
								__html: content["paragraph_three"].value
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
					<label htmlFor="certifications">
						{this.props.getLabel(11, `Certifications Held`)}
					</label>
					{this.props.action === "update" ? (
						<TagsInput
							id="certifications"
							name="certifications"
							value={
								certifications
									? certifications
									: this.props.certificationsInitial
							}
							onChange={handleCertificationsChange}
						/>
					) : (
						<TagsInput
							id="certifications"
							name="certifications"
							value={certifications}
							onChange={handleCertificationsChange}
						/>
					)}

					<Message>
						<p>Here you can enter multiple certifications.</p>
						<p>
							When entering, hit the 'Enter' key or 'Tab' key to create an
							entry.
						</p>
					</Message>
				</Col>
			</Row>
		);
	}
}
