import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/en-gb";

import { device } from "../../lib/MediaQueries";

import IconCheck from "../../assets/icons/fa/check.svg";
import IconEllipsis from "../../assets/icons/fa/ellipsis-h.svg";

import DeleteJob from "../../components/jobs/actions/DeleteJob";

import Link from "../../components/atomic/atoms/Link";

const JobActions = styled.nav`
	.button {
		margin-top: 0;
	}

	.button + .button {
		margin-left: 8px;
	}
`;

const CellStage = styled.td`
	.table & {
		min-width: 0px;
	}

	.status {
		align-items: center;
		border-radius: 50%;
		display: flex;
		height: 36px;
		justify-content: center;
		margin: 0 auto;
		width: 36px;

		background-color: rgba(
			${props => (props.theme.purpleRGB ? props.theme.purpleRGB : "91,26,255")},
			0.2
		);
		border: 1px solid
			${props => (props.theme.purple ? props.theme.purple : "#5b1aff")};
		flex-shrink: 0;
		font-size: 0px;
		position: relative;

		@media ${device.sm} {
			&:hover {
				&:after {
					z-index: 999;

					opacity: 1;
				}
			}
		}

		&:after {
			content: attr(data-stage);
			padding: 8px 16px;
			position: absolute;
			right: calc(100% + 8px);
			top: 50%;
			z-index: -999;

			background-color: rgba(
				${props =>
					props.theme.purpleRGB ? props.theme.purpleRGB : "91,26,255"},
				1
			);
			color: ${props => (props.theme.white ? props.theme.white : "#FFF")};
			font-size: 12px;
			opacity: 0;
			transform: translateY(-50%);
			transition: 0.2s opacity ease;
		}

		svg {
			width: 50%;

			fill: ${props => (props.theme.purple ? props.theme.purple : "#5b1aff")};
		}

		&[data-stage="ACCEPTEDAPPLICANT"] {
			background-color: rgba(
				${props =>
					props.theme.primaryRGB ? props.theme.primaryRGB : "26,133,255"},
				0.2
			);
			border: 1px solid
				${props => (props.theme.primary ? props.theme.primary : "#1a85ff")};

			&:after {
				background-color: rgba(
					${props =>
						props.theme.primaryRGB ? props.theme.primaryRGB : "26,133,255"},
					1
				);
			}

			svg {
				fill: ${props =>
					props.theme.primary ? props.theme.primary : "#1a85ff"};
			}
		}

		&[data-stage="JOBREVIEWED"] {
			background-color: rgba(
				${props =>
					props.theme.primaryRGB ? props.theme.greenRGB : "78,230,0"},
				0.2
			);
			border: 1px solid
				${props => (props.theme.green ? props.theme.green : "#4ee600")};

			&:after {
				background-color: rgba(
					${props =>
						props.theme.greenRGB ? props.theme.greenRGB : "78,230,0"},
					1
				);
			}

			svg {
				fill: ${props => (props.theme.green ? props.theme.green : "#4ee600")};
			}
		}
	}
`;

export default class JobControl extends Component {
	state = {
		active: false
	};

	render() {
		const { index, job } = this.props;

		const { id, postcode, stage, startDate, title, trades, user } = job;
		const { email } = user;

		return (
			<tr>
				<CellStage>
					<span className="status" data-stage={stage}>
						{stage === "ACCEPTEDAPPLICANT" && <IconCheck />}
						{stage === "CREATED" && <IconEllipsis />}
						{stage === "JOBREVIEWED" && <IconCheck />}
						{stage}
					</span>
				</CellStage>
				<td title={id}>
					<Link
						href={{
							pathname: "/job",
							query: { id: id }
						}}
					>
						<a>{title}</a>
					</Link>
				</td>
				<td>{moment(startDate).format("DD/MM/YYYY")}</td>
				<td title={user.id}>
					<Link
						href={{
							pathname: "/user",
							query: { id: user.id }
						}}
					>
						<a>{user.name}</a>
					</Link>
				</td>
				<td>{postcode}</td>
				<td>{email}</td>
				<td>
					{trades &&
						trades.map(trade => {
							return <span key={id + `-` + trade.id}>{trade.name}</span>;
						})}
				</td>
				<td>
					<JobActions>
						<Link
							classList="button"
							href={{
								pathname: "job-manager",
								query: { id: id }
							}}
						>
							<a>Manage</a>
						</Link>
						<DeleteJob id={id}>Delete</DeleteJob>
					</JobActions>
				</td>
			</tr>
		);
	}
}
