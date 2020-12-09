import React, { Component } from "react";
import styled from "styled-components";

import { device } from "../../../lib/MediaQueries";

const StyledWrapper = styled.section`
	margin: 0 0 64px;
	padding: 0 15px;

	@media ${device.xl} {
		margin: 0 0 100px;
		padding: 0 45px;
	}
`;

export default class Wrapper extends Component {
	render() {
		return (
			<StyledWrapper className="wrapper">{this.props.children}</StyledWrapper>
		);
	}
}
