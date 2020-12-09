import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const SuccessStyles = styled.div`
	padding: 2rem;
	background: white;
	margin: 2rem 0;
	border: 1px solid
		rgba(
			${props =>
				props.theme.primaryRGB ? props.theme.primaryRGB : "26,133,255"};,
			0.05
		);

	border-left: 5px solid blue;
	p {
		margin: 0;
		font-weight: 100;
	}
	strong {
		margin-right: 1rem;
	}
`;

export default class DisplaySuccess extends Component {
	state = {
		active: false
	};

	scrollElementIntoViewIfNeeded(domNode) {
		if (domNode)
			domNode.scrollIntoView({ behavior: "smooth", block: "center" });
	}

	componentDidMount() {
		this.ensureVisible();
	}

	componentDidUpdate() {
		this.ensureVisible();
	}

	ensureVisible() {
		if (this.state.active) {
			this.scrollElementIntoViewIfNeeded(ReactDOM.findDOMNode(this));
		}
	}

	render() {
		const { success } = this.props;
		if (!success || !success.message) return null;
		if (success && this.state.active === false) {
			this.setState({ active: true });
		}
		if (
			success.networkSuccess &&
			success.networkSuccess.result &&
			success.networkSuccess.result.successs.length
		) {
			return success.networkSuccess.result.successs.map((success, i) => (
				<SuccessStyles key={i}>
					<p data-test="graphql-success">
						<strong>Success:</strong>
						{success.message.replace("GraphQL success: ", "")}
					</p>
				</SuccessStyles>
			));
		}
		return (
			<SuccessStyles>
				<p data-test="graphql-success">
					<strong>Success:</strong>
					{success.message.replace("GraphQL success: ", "")}
				</p>
			</SuccessStyles>
		);
	}
}

DisplaySuccess.defaultProps = {
	success: {}
};

DisplaySuccess.propTypes = {
	success: PropTypes.object
};
