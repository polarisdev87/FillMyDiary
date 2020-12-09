import styled from "styled-components";

const JobReviewFormStyles = styled.form`
	margin-top: 32px;
	padding-top: 32px;

	border-top: 1px solid
		${props => (props.theme.grey100 ? props.theme.grey100 : "#d9d9d9")};

	input[type="radio"] {
		display: none;

		&:checked {
			+ label {
				display: flex;
				justify-content: space-between;

				background: rgba(26, 133, 255, 0.1);
				border: 1px solid
					${props => (props.theme.blue600 ? props.theme.blue600 : "#006be6")};
				color: ${props =>
					props.theme.blue600 ? props.theme.blue600 : "#006be6"};
			}
		}
	}

	label + label {
		margin-top: 16px;
		padding-top: 16px;

		border-top: 1px solid
			${props => (props.theme.grey100 ? props.theme.grey100 : "#d9d9d9")};
	}

	input + label {
		border-radius: 8px;
		padding: 8px;

		border: 1px solid transparent;
		cursor: pointer;
		transition: 0.2s all ease;

		&:hover {
			background: rgba(26, 133, 255, 0.1);
			border: 1px solid
				${props => (props.theme.blue600 ? props.theme.blue600 : "#006be6")};
			color: ${props =>
				props.theme.blue600 ? props.theme.blue600 : "#006be6"};
		}
	}
`;

export default JobReviewFormStyles;
