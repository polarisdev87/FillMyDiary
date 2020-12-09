import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";

import RestrictAreaAdmin from "../../components/atomic/particles/RestrictAreaAdmin";

import HeaderAdmin from "../../components/header/Admin";

import { ALL_SETTINGS_QUERY } from "../../components/queries/setting/AllSettings";

import { UPDATE_SETTING_MUTATION } from "../../components/mutations/setting/UpdateSetting";

export default class SiteSettings extends Component {
	render() {
		return (
			<RestrictAreaAdmin>
				<HeaderAdmin />
				<h1>Site Settings</h1>
				<Query query={ALL_SETTINGS_QUERY}>
					{({ data, loading, error }) => {
						if (loading) return null;
						if (error) return <ErrorMessage error={error} />;

						return (
							<>
								{data.settings
									? data.settings.map(setting => {
											return <SingleSetting data={setting} key={setting.id} />;
									  })
									: null}
							</>
						);
					}}
				</Query>
			</RestrictAreaAdmin>
		);
	}
}

class SingleSetting extends Component {
	state = {
		id: this.props.data.id
	};

	handleChange = e => {
		const { name, type, value } = e.target;

		this.setState({ [name]: value });
	};

	updateSettings = async (e, updateSettingMutation) => {
		e.preventDefault();
		this.setState({ updated: false });
		const res = await updateSettingMutation({
			variables: {
				...this.state
			}
		});
		this.setState({ updated: true });
	};

	render() {
		const { id, setting, value } = this.props.data;

		return (
			<Mutation mutation={UPDATE_SETTING_MUTATION} variables={this.state}>
				{(updateSetting, { error, loading }) => {
					return (
						<form
							method="post"
							onSubmit={e => this.updateSettings(e, updateSetting)}
						>
							<fieldset disabled={loading} aria-busy={loading}>
								<div className="field" key={id}>
									<label htmlFor={setting}>{setting}</label>
									<input
										defaultValue={value}
										id={setting}
										name="value"
										onChange={this.handleChange}
										type="text"
									/>
								</div>
								<button type="submit" value="Update Setting">
									Update Setting
								</button>
							</fieldset>
						</form>
					);
				}}
			</Mutation>
		);
	}
}
