import React, { Component } from "react";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
import styled from "styled-components";

import { GOOGLE_API_KEY } from "../../../config";

import Message from "../../atomic/molecules/message/Message";

const LocationStyles = styled.div`
	input {
		margin-bottom: 16px;
	}

	.location__suggestion {
		padding: 8px 16px;
	}
`;

export default class Address extends Component {
	render() {
		const { required, search, value, user } = this.props;

		return (
			<LocationStyles>
				<label htmlFor="location">{this.props.getLabel(3, `Address`)}</label>
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
									id="location"
									name="location"
									onChange={this.props.handleInputChange}
									placeholder="Search for an address"
									required={required}
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
