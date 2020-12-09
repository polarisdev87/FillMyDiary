import React, { Component } from "react";
import Link from "next/link";
import GoogleMapReact from "google-map-react";

import LocationStyles from "./styles/LocationStyles";
import mapStyles from "../../atomic/particles/mapStyles.json";

const zoom = 11;

export default class SingleLocation extends Component {
	state = {
		center: {
			lat: 20,
			lng: 30.33
		},
		zoom
	};

	handleApiLoaded = (map, maps) => {
		const position = this.state.center;
		map.setCenter(position);
		var iconSize = 0.5;
		var icon = {
			path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
			fillColor: "#FF0000",
			fillOpacity: 0,
			anchor: new google.maps.Point(0, 0),
			strokeWeight: 0,
			scale: iconSize
		};

		var marker = new google.maps.Marker({
			draggable: false,
			icon: icon,
			map: map,
			position: position,
			title: "Job Location",
			zIndex: -20
		});
	};

	componentDidMount() {
		const center = {
			lat: parseFloat(this.props.latitude),
			lng: parseFloat(this.props.longitude)
		};
		this.setState({ center: center });
	}

	createMapOptions() {
		return {
			disableDefaultUI: true,
			draggable: this.props.draggable ? this.props.draggable : true,
			mapTypeControl: this.props.mapTypeControl
				? this.props.mapTypeControl
				: false,
			panControl: this.props.panControl ? this.props.panControl : true,
			scrollwheel: this.props.scrollwheel ? this.props.scrollwheel : true,
			styles: mapStyles
		};
	}

	render() {
		return (
			<LocationStyles id="map" className={this.props.className}>
				<GoogleMapReact
					bootstrapURLKeys={{
						key: "AIzaSyA0FepfRSrKhCyfqI4hzdAhRctIwM48__4"
					}}
					center={this.state.center}
					defaultZoom={this.state.zoom}
					options={this.createMapOptions()}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
				/>
			</LocationStyles>
		);
	}
}
