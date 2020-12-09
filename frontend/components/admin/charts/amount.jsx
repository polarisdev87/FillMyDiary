import React, { Component } from "react";
import moment from "moment";
import ReactChartkick, { LineChart, PieChart } from "react-chartkick";
import Chart from "chart.js";
ReactChartkick.addAdapter(Chart);
import { SketchPicker } from "react-color";
import styled from "styled-components";
import "moment/locale/en-gb";

import { formatMoney } from "../../helpers";

const today = new Date();
today.setHours(0, 0, 0, 0);
const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
const timestamp = today.getTime();
const ONE_DAY = 86400000;

function madeToday(date, comparisonDate) {
	date = new Date(date);
	date.setHours(0, 0, 0, 0);
	date = Date.parse(date);
	return date === comparisonDate;
}

const ChartContents = styled.section`
	table {
		margin: 32px 0 0;
	}

	.chart {
		padding: 16px;

		background-color: white;
	}
`;

const ChartHeader = styled.header`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: 32px 0;

	h2 {
		margin: 0;
	}
`;

const ChartControls = styled.section`
	display: flex;
	justify-content: flex-end;

	input[type="radio"] {
		display: none;
		margin: 0;

		&:checked {
			+ label {
				background-color: ${props =>
					props.theme.primary ? props.theme.primary : "#1a85ff"};
				color: white;
			}
		}
	}

	label {
		border-radius: 3px;
		margin: 0 4px;
		padding: 8px 16px;

		background-color: transparent;
		border: 1px solid
			${props => (props.theme.grey200 ? props.theme.grey200 : "#bfbfbf")};
		cursor: pointer;
		transition: 0.2s all ease;

		&:hover {
			background-color: ${props =>
				props.theme.primary ? props.theme.primary : "#1a85ff"};
			color: white;
		}
	}

	.chart__colours {
		position: relative;
		margin-right: 4px;
	}

	.chart__colours__picker {
		position: absolute;
	}
`;

export default class AmountChartElement extends Component {
	state = {
		changeColour: false,
		colourAccent: "#1a85ff",
		colourBlack: "#141213",
		days: 7,
		viewTable: false
	};

	toggleColourMode = e => {
		this.setState({ changeColour: !this.state.changeColour });
	};

	toggleTableMode = e => {
		this.setState({ viewTable: !this.state.viewTable });
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		const val = type === "number" ? parseFloat(value) : value;
		if (type === "radio") e.target.checked = true;
		this.setState({ [name]: val });
	};

	handleChangeComplete = color => {
		this.setState({ colourAccent: color.hex });
	};

	render() {
		const { data, title, yLabel } = this.props;

		var days = {};
		var total = 0;

		for (var i = 1; i <= this.state.days; i++) {
			total = 0;

			const date = new Date(today).setDate(
				today.getDate() + i - this.state.days
			);
			const dateFormatted = moment(date).format("DD/MM/YYYY");

			const dataToday = data.filter(dataItem =>
				madeToday(new Date(dataItem.createdAt), date)
			);

			if (dataToday.length !== 0) {
				total = dataToday.reduce((tot, order) => {
					return tot + order.total;
				}, 0);
			}

			total = formatMoney(total);
			total = total.replace("£", "");

			days[dateFormatted] = total;
		}

		return (
			<ChartContents>
				<ChartHeader>
					<h2>{title}</h2>
					<ChartControls>
						{[...Array(5)].map((x, i) => {
							if (i === 0) return null;
							return (
								<React.Fragment key={this.props.id + "-" + i}>
									<input
										key={i}
										type="radio"
										name="days"
										id={this.props.id + "-" + i}
										value={i * 7}
										onChange={this.handleChange}
									/>
									<label htmlFor={this.props.id + "-" + i}>{i * 7} Days</label>
								</React.Fragment>
							);
						})}
						<div className="chart__colours">
							<button onClick={this.toggleColourMode}>
								Chang{this.state.changeColour ? "ing" : "e"} Colours
							</button>
							{this.state.changeColour && (
								<div className="chart__colours__picker">
									<SketchPicker
										color={this.state.colourAccent}
										onChangeComplete={this.handleChangeComplete}
									/>
								</div>
							)}
						</div>
						<button onClick={this.toggleTableMode}>
							{this.state.viewTable ? "Close Table" : "View Table"}
						</button>
					</ChartControls>
				</ChartHeader>
				<div className="chart">
					<LineChart
						colors={[this.state.colourAccent, this.colourBlack]}
						data={days}
						height="500px"
						xtitle="Dates"
						ytitle={yLabel}
					/>
				</div>
				{this.state.viewTable && (
					<table className="table">
						<thead>
							<tr>
								<th>Date</th>
								<th>{yLabel}</th>
							</tr>
						</thead>
						<tbody>
							{Object.keys(days).map((key, index) => {
								return (
									<tr key={index}>
										<td>{key}</td>
										<td>£{days[key]}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</ChartContents>
		);
	}
}
