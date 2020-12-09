import React, { Component } from "react";
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "../../../assets/scss/datepicker.scss";
import moment from "moment";
import "moment/locale/en-gb";

const dateOptions = [7, 14, 21, 28];

export default class StartDate extends Component {
	render() {
		const { date, focused } = this.props;

		return (
			<>
				<span className="search__dateFilter" title="Change Job Start Date">
					<label htmlFor="dateFilter">Job Start Date</label>
					<SingleDatePicker
						date={date}
						onDateChange={date => this.props.handleDateChange(date)}
						focused={focused}
						onFocusChange={focused => this.props.handleDateFocus(focused)}
						id="startDate"
						noBorder={true}
					/>
				</span>
				<select
					id="dateFilter"
					name="dateFilter"
					onChange={this.props.handleChange}
				>
					<option value={0}>All Dates</option>
					{dateOptions &&
						dateOptions.map((option, index) => {
							const weeks = Math.floor(option / 7);
							return (
								<option key={`date-${option}`} value={option}>
									Within {weeks} week{weeks > 1 && `s`}
								</option>
							);
						})}
				</select>
			</>
		);
	}
}
