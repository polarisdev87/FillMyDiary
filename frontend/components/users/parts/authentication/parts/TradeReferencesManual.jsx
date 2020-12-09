import React, { Component } from "react";

export default class TradeReferencesManual extends Component {
	render() {
		const {
			handleChange,
			instructions,
			manualReferenceOne,
			manualReferenceTwo,
			manualReferenceThree
		} = this.props;

		return (
			<>
				<div
					dangerouslySetInnerHTML={{
						__html: instructions
					}}
				/>
				<label htmlFor="manualReferenceOne">
					{this.props.getLabel(13, `Trade Reference One`)}
				</label>
				<input
					type="text"
					id="manualReferenceOne"
					name="manualReferenceOne"
					required
					value={manualReferenceOne}
					onChange={handleChange}
				/>
				<label htmlFor="manualReferenceTwo">
					{this.props.getLabel(14, `Trade Reference Two`)}
				</label>
				<input
					type="text"
					id="manualReferenceTwo"
					name="manualReferenceTwo"
					required
					value={manualReferenceTwo}
					onChange={handleChange}
				/>
				<label htmlFor="manualReferenceThree">
					{this.props.getLabel(15, `Trade Reference Three`)}
				</label>
				<input
					type="text"
					id="manualReferenceThree"
					name="manualReferenceThree"
					required
					value={manualReferenceThree}
					onChange={handleChange}
				/>
			</>
		);
	}
}
