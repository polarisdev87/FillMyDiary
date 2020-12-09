import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";

import FancyCheckboxes from "../../../styles/FancyCheckboxes";

import TradeReferencesManual from "./parts/TradeReferencesManual";
import TermsAgreement from "../parts/TermsAgreement";

export default class Authentication extends Component {
	render() {
		const {
			acceptedTerms,
			content,
			handleChange,
			manualReferences,
			referenceOne,
			manualReferenceOne,
			manualReferenceTwo,
			manualReferenceThree
		} = this.props;

		return (
			<Row>
				<Col lg={6}>
					<h2>{content && content["heading_four"].value}</h2>
					{content && (
						<p
							dangerouslySetInnerHTML={{
								__html: content["paragraph_four"].value
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
					{!manualReferences && (
						<>
							<label htmlFor="referenceOne">
								{this.props.getLabel(12, `Profile Reference`)}
							</label>
							<input
								type="text"
								id="referenceOne"
								name="referenceOne"
								required
								title="Please enter a valid website"
								value={referenceOne}
								onChange={handleChange}
							/>
						</>
					)}
					<FancyCheckboxes>
						<input
							type="checkbox"
							id="manualReferences"
							name="manualReferences"
							value={!manualReferences}
							onChange={handleChange}
						/>
						<label htmlFor="manualReferences">
							I do not have reference websites and require manual verification
						</label>
					</FancyCheckboxes>
					{manualReferences && (
						<>
							<TradeReferencesManual
								getLabel={this.props.getLabel}
								handleChange={handleChange}
								instructions={content["manual_references_instructions"].value}
								manualReferenceOne={manualReferenceOne}
								manualReferenceTwo={manualReferenceTwo}
								manualReferenceThree={manualReferenceThree}
							/>
							<TermsAgreement
								acceptedTerms={acceptedTerms}
								handleChange={this.props.handleChange}
							/>
						</>
					)}
				</Col>
			</Row>
		);
	}
}
