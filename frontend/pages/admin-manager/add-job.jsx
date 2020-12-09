import React, { Component } from "react";
import { Row, Col } from "react-grid-system";
import { getWordPressDataPage } from "../../commonFunctions";

import RestrictAreaAdmin from "../../components/atomic/particles/RestrictAreaAdmin";

import HR from "../../components/atomic/atoms/HR";

import HeaderAdmin from "../../components/header/Admin";

import CreateJobAdmin from "../../components/jobs/create/CreateJobAdmin";

export default class AddJob extends Component {
	static async getInitialProps() {
		const data = await getWordPressDataPage(`post`);
		return data;
	}

	createMarkup(content) {
		return { __html: content };
	}

	render() {
		const content = this.props.content.content;

		return (
			<React.Fragment>
				<RestrictAreaAdmin>
					<HeaderAdmin />
					<HR invisible={true} />
					<Row>
						<Col lg={6}>
							<h1>{content && content["heading_one"].value}</h1>
							<p
								dangerouslySetInnerHTML={this.createMarkup(
									content["paragraph_one"].value
								)}
							/>
						</Col>
					</Row>
					<CreateJobAdmin content={content} />
				</RestrictAreaAdmin>
			</React.Fragment>
		);
	}
}
