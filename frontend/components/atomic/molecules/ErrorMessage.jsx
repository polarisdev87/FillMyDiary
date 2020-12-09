import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const ErrorStyles = styled.div`
	padding: 2rem;
	background: white;
	margin: 2rem 0;
	border: 1px solid rgba(0, 0, 0, 0.05);
	border-left: 5px solid red;
	p {
		margin: 0;
		font-weight: 100;
	}
	strong {
		margin-right: 1rem;
	}
`;

export default class DisplayError extends Component {
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
		const { error } = this.props;
		if (!error || !error.message) return null;
		if (error && this.state.active === false) {
			this.setState({ active: true });
		}
		if (
			error.networkError &&
			error.networkError.result &&
			error.networkError.result.errors.length
		) {
			return error.networkError.result.errors.map((error, i) => (
				<ErrorStyles key={i}>
					<p data-test="graphql-error">
						<strong>Error: </strong>
						{error.message.replace("GraphQL error: ", "")}
					</p>
				</ErrorStyles>
			));
		}
		return (
			<ErrorStyles>
				<p data-test="graphql-error">
					<strong>Error: </strong>
					{error.message.replace("GraphQL error: ", "")}
				</p>
			</ErrorStyles>
		);
	}
}

DisplayError.defaultProps = {
	error: {}
};

DisplayError.propTypes = {
	error: PropTypes.object
};
