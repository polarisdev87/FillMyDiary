import React, { Component } from "react";

const distanceOptions = [1, 5, 10, 15, 20, 50, 100];

export default class Distance extends Component {
	render() {
		const { user } = this.props;

		return (
			<>
				<label htmlFor="distance">Job Distance</label>
				<select
					disabled={user.latitude === 0 || user.longitude === 0}
					id="distance"
					name="distance"
					onChange={this.props.handleChange}
				>
					{user.latitude === 0 && user.longitude === 0 && (
						<option>Set Your Location to Search By Distance</option>
					)}
					<option value={0}>All Distances</option>
					{distanceOptions &&
						distanceOptions.map((distance, index) => (
							<option key={`distance-${distance}`} value={distance}>
								Within {distance} mile{distance > 1 && `s`}
							</option>
						))}
				</select>
			</>
		);
	}
}
