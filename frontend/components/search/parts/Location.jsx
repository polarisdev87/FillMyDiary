import React, { Component } from "react";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
import styled from "styled-components";

import { GOOGLE_API_KEY } from "../../../config";

const LocationStyles = styled.div`
	.location__input {
		margin: 0;
		padding: 16px;
		width: 100%;

		background-color: #e5f1ff;
		color: #3c72b3;
		font-size: 18px;
		font-weight: 500;
		line-height: 21px;
	}

	.location__suggestion {
		padding: 8px 16px;
	}
`;

export default class Location extends Component {
	render() {
		const { location, search } = this.props;

		return (
			<LocationStyles>
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
									input: search,
									componentRestrictions: {
										country: ["gb"]
									}
								}}
								onSelectSuggest={this.props.handleSelectSuggest}
								textNoResults="My custom no results text" // null or "" if you want to disable the no results item
								customRender={prediction => (
									<div className="location__suggestion">
										{prediction
											? prediction.description
											: "My custom no results text"}
									</div>
								)}
							>
								<input
									autoComplete="off"
									className="location__input"
									id="location"
									name="location"
									placeholder="Search for a location"
									type="search"
									value={location}
									onChange={this.props.handleInputChange}
								/>
							</GooglePlacesSuggest>
						)
					}
				/>
			</LocationStyles>
		);
	}
}
