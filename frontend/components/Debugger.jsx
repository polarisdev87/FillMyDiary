import React, { Component } from "react";
import styled from "styled-components";

const DebuggerWrapper = styled.pre`
	word-break: break-all;
`;

export default class Debugger extends React.Component {
	render() {
		return (
			<DebuggerWrapper>
				<code>{JSON.stringify(this.props.data, null, 4)}</code>
			</DebuggerWrapper>
		);
	}
}
