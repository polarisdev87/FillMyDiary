import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import { getWordPressDataPage } from "../commonFunctions";
import { APIURL } from "../config";
import { Container, Row, Col } from "react-grid-system";

import CreateMarkup from "../components/atomic/particles/CreateMarkup";

import Tease from "../components/atomic/molecules/Tease";

class BlogArchive extends Component {
	static async getInitialProps() {
		const content = await getWordPressDataPage(`blog-archive`);

		var postsList;
		try {
			const res = await fetch(`${APIURL}posts/v2/all`);
			postsList = await res.json();
		} catch (error) {
			console.log(error);
			return { postsList };
		}

		return {
			content,
			posts: postsList
		};
	}

	render() {
		const posts = this.props.posts;

		return (
			<React.Fragment>
				{this.props.content && (
					<CreateMarkup pageHTML={this.props.content.content.content} />
				)}
				{posts && (
					<Row>
						{posts.map(post => (
							<Col lg={4} key={post.id}>
								<Tease content={post} />
							</Col>
						))}
					</Row>
				)}
			</React.Fragment>
		);
	}
}

export default BlogArchive;
