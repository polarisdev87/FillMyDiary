import React, { Component } from "react";

export default class PayPerDay extends Component {
	render() {
		const { price } = this.props;

		return (
			<>
				<label htmlFor="price">Minimum Pay Per Day</label>
				<div className="input-group">
					<div className="input-group__append">£</div>
					<input
						id="price"
						max="1000"
						min="40"
						name="price"
						required
						onChange={this.props.handleChange}
						step="5"
						type="number"
						value={price}
					/>
				</div>
			</>
		);
	}
}
