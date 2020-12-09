import React, { Component } from "react";
import { Row, Col } from "react-grid-system";
import "react-dates/initialize";
import {
	DateRangePicker,
	SingleDatePicker,
	DayPickerRangeController
} from "react-dates";
import "../../../assets/scss/datepicker.scss";

export default class Dates extends Component {
	render() {
		return (
			<Row>
				<Col lg={6}>
					<h2>
						{this.props.content && this.props.content["heading_four"].value}
					</h2>
					{this.props.invalidDates && (
						<ErrorMessage error={{ message: "Invalid Dates" }} />
					)}
					{this.props.content && (
						<p
							dangerouslySetInnerHTML={{
								__html: this.props.content["paragraph_four"].value
							}}
						/>
					)}
				</Col>
				<Col lg={5} offset={{ lg: 1 }}>
					<label htmlFor="days">
						{this.props.getLabel(7, `Number of Days Required`)}
					</label>
					<input
						type="number"
						id="days"
						name="days"
						required
						value={this.props.days}
						onChange={this.props.handleChange}
						min="0"
						step="1"
					/>
					<label htmlFor="datesRequiredStart">
						{this.props.getLabel(8, `Dates Required`)}
					</label>
					<DateRangePicker
						startDate={this.props.startDate}
						startDateId="datesRequiredStart"
						endDate={this.props.endDate}
						endDateId="datesRequiredEnd"
						onDatesChange={({ startDate, endDate }) => {
							this.props.handleDateChange(startDate, endDate);
						}}
						focusedInput={this.props.focusedInput}
						onFocusChange={focusedInput =>
							this.props.handleDateFocus(focusedInput)
						} // PropTypes.func.isRequired,
						noBorder={true}
						block={true}
						required={true}
						minimumNights={0}
					/>
					<label htmlFor="price">
						{this.props.getLabel(9, `Day Rate Offered`)}
					</label>
					<input
						type="number"
						id="price"
						name="price"
						required
						value={this.props.price}
						onChange={this.props.handleChange}
						min="0"
						step="1"
					/>
					<label htmlFor="paymentType">
						{this.props.getLabel(10, `Payment Type Offered (Cash / Invoice)`)}
					</label>
					<select
						id="paymentType"
						name="paymentType"
						required
						value={this.props.paymentType}
						onChange={this.props.handleChange}
					>
						<option value="cash">Cash</option>
						<option value="invoice">Invoice</option>
					</select>
				</Col>
			</Row>
		);
	}
}
