import React, { Component } from "react";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
import styled from "styled-components";

import { GOOGLE_API_KEY } from "../../../../../config";

const LocationStyles = styled.div`
	margin-top: 16px;

	.location__suggestion {
		padding: 8px 16px;
	}
`;

export default class Address extends Component {
	render() {
		const { search, value, user } = this.props;

		return (
			<LocationStyles>
				<label htmlFor="postcode">{this.props.getLabel(8, `Address`)}</label>
				<GoogleMapLoader
					params={{
						key: GOOGLE_API_KEY,
						libraries: "places,geocode"
					}}
					render={googleMaps =>
						googleMaps && (
							<GooglePlacesSuggest
								googleMaps={googleMaps}
								autocompletionRequest={{
									componentRestrictions: {
										country: ["gb"]
									},
									input: search
								}}
								onSelectSuggest={this.props.handleSelectSuggest}
								textNoResults="No Results Found" // null or "" if you want to disable the no results item
								customRender={prediction => (
									<div className="location__suggestion">
										{prediction ? prediction.description : "No Results Found"}
									</div>
								)}
							>
								<input
									autoComplete="new-password"
									id="address"
									name="address"
									onChange={this.props.handleInputChange}
									placeholder="Search for an address"
									required={true}
									type="text"
									value={value}
								/>
							</GooglePlacesSuggest>
						)
					}
				/>
			</LocationStyles>
		);
	}
}
