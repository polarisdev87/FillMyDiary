import React, { Component } from "react";
import Link from "next/link";
import GoogleMapReact from "google-map-react";
import styled, { ThemeProvider } from "styled-components";

import mapStyles from "../particles/mapStyles.json";

const StyledMap = styled.div`
	height: 400px;

	max-height: 40vh;

	:not(.map--standard) {
		left: 50%;
		margin-bottom: 96px;
		margin-left: -50vw;
		position: relative;
		width: 100vw;
	}

	&:before {
		/* content: ""; */
		display: block;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 2;

		cursor: default;
	}
`;

const AnyReactComponent = ({ text }) => (
	<div>
		<img src="/static/icons/map-marker.png" />
	</div>
);

class Map extends Component {
	state = {
		center: {
			lat: 20,
			lng: 30.33
		},
		zoom: this.props.zoom ? this.props.zoom : 11
	};

	componentDidMount() {
		const center = {
			lat: parseFloat(this.props.lat),
			lng: parseFloat(this.props.lng)
		};

		this.setState({ center: center });
	}

	createMapOptions() {
		return {
			disableDefaultUI: true,
			draggable: this.props.draggable ? this.props.draggable : false,
			mapTypeControl: this.props.mapTypeControl
				? this.props.mapTypeControl
				: false,
			panControl: this.props.panControl ? this.props.panControl : false,
			scrollwheel: this.props.scrollwheel ? this.props.scrollwheel : false,
			styles: mapStyles
		};
	}

	render() {
		return (
			<StyledMap id="map" className={this.props.className}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyA0FepfRSrKhCyfqI4hzdAhRctIwM48__4" }}
					center={this.state.center}
					defaultZoom={this.state.zoom}
					options={this.createMapOptions()}
				>
					<AnyReactComponent
						lat={this.state.center.lat}
						lng={this.state.center.lng}
						text="My Marker"
					/>
				</GoogleMapReact>
			</StyledMap>
		);
	}
}

export default Map;
