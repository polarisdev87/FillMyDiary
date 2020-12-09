import React, { Component } from "react";

export default class FormBuilder extends Component {
	render() {
		const { loading, handleChange } = this.props;

		return (
			<fieldset disabled={loading} aria-busy={loading}>
				<label>Would you use this tradesman again?</label>
				<input
					defaultChecked
					id="fieldOneTrue"
					name="fieldOne"
					onChange={handleChange}
					required={true}
					type="radio"
					value="true"
				/>
				<label htmlFor="fieldOneTrue">Yes</label>
				<input
					id="fieldOneFalse"
					name="fieldOne"
					onChange={handleChange}
					required={true}
					type="radio"
					value="false"
				/>
				<label htmlFor="fieldOneFalse">No</label>

				<label>Were they on time?</label>
				<input
					defaultChecked
					id="fieldTwoTrue"
					name="fieldTwo"
					onChange={handleChange}
					required={true}
					type="radio"
					value="true"
				/>
				<label htmlFor="fieldTwoTrue">Yes</label>
				<input
					id="fieldTwoFalse"
					name="fieldTwo"
					onChange={handleChange}
					required={true}
					type="radio"
					value="false"
				/>
				<label htmlFor="fieldTwoFalse">No</label>

				<label>Was their work satisfactory?</label>
				<input
					defaultChecked
					id="fieldThreeTrue"
					name="fieldThree"
					onChange={handleChange}
					required={true}
					type="radio"
					value="true"
				/>
				<label htmlFor="fieldThreeTrue">Yes</label>
				<input
					id="fieldThreeFalse"
					name="fieldThree"
					onChange={handleChange}
					required={true}
					type="radio"
					value="false"
				/>
				<label htmlFor="fieldThreeFalse">No</label>
			</fieldset>
		);
	}
}
