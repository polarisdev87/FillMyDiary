import React, { Component } from "react";

import Heading from "../atoms/Heading";
import HTML from "../atoms/HTML";
import Paragraph from "../atoms/Paragraph";

import Hero from "../molecules/Hero";
import Map from "../molecules/Map";
import Row from "../molecules/Row";

import Locations from "../organisms/locations/Locations";
import GetInTouch from "../organisms/contact/GetInTouch";

export default class CreateMarkup extends Component {
	render() {
		let pageHTML = this.props.pageHTML;

		if (
			pageHTML &&
			pageHTML[0] &&
			pageHTML[0].hasOwnProperty("data") &&
			pageHTML[0].data !== null
		) {
			let componentsArray = [];
			let newArrayDataOfOjbect = Object.values(pageHTML);

			for (var key in newArrayDataOfOjbect) {
				if (newArrayDataOfOjbect.hasOwnProperty(key))
					componentsArray.push(newArrayDataOfOjbect[key]);
			}

			const pageComponents = componentsArray.map((component, index) => {
				if (component.name == "acf/heading") {
					return (
						<Heading
							key={component.id}
							index={index}
							level={component.data.level}
							semantic={component.data.semantic}
							text={component.data.text}
						/>
					);
				}
				if (component.name == "acf/hero") {
					return (
						<Hero
							alignment={component.data.alignment}
							colour={component.data.colour}
							content={component.data.content}
							data={component.data}
							gradient={component.data.gradient}
							index={index}
							key={component.id}
							media={component.data.media}
							name={component.name}
							overlay={component.data.overlay}
							size={component.data.size}
						/>
					);
				}
				if (component.name == "acf/html") {
					return (
						<HTML
							content={component.data.content}
							index={index}
							key={component.id}
							name={component.name}
						/>
					);
				}
				if (component.name == "acf/locations") {
					return (
						<Locations
							content={component.data.content}
							image={component.data.media}
							speed={component.data.speed}
							index={index}
							key={component.id}
							name={component.name}
						/>
					);
				}
				if (component.name == "acf/map") {
					return (
						<Map
							key={component.id}
							index={index}
							lat={component.data.location.lat}
							lng={component.data.location.lng}
							zoom={component.zoom}
							className="full"
						/>
					);
				}
				if (component.name == "acf/paragraph") {
					return (
						<Paragraph
							index={index}
							key={component.id}
							name={component.name}
							text={component.data.text}
						/>
					);
				}
				if (component.name == "acf/row") {
					return (
						<Row
							centerAlign={component.data.center_align}
							index={index}
							key={component.id}
							name={component.name}
							rows={component.data.rows}
						/>
					);
				}
				if (component.name == "acf/support") {
					return (
						<GetInTouch
							key={component.id}
							index={index}
							content={component.data.content}
						/>
					);
				}
				return;
			});

			if (pageComponents) {
				return pageComponents;
			}
		} else {
			return null;
		}
	}
}
