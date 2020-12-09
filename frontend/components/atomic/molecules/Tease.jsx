import React, { Component } from "react";
import moment from "moment";
import styled from "styled-components";
import "moment/locale/en-gb";

import Debugger from "../../Debugger";

import Link from "../atoms/Link";

const TeaseElement = styled.nav`
	margin: 32px 0;

	.tease__title {
		color: inherit;
	}

	.tease__meta {
		display: block;
		margin: 16px 0;
	}

	.tease__thumbnail {
		height: 300px;
		object-fit: cover;
		width: 100%;
	}
`;

export default class Tease extends Component {
	render() {
		const { content } = this.props;

		if (content) {
			return (
				<TeaseElement className="tease">
					{/* <Debugger data={content} /> */}
					{content.thumbnailDefault && (
						<Link href={{ pathname: "/blog", query: { slug: content.slug } }}>
							<a>
								<img
									alt={content.seoTitle ? content.seoTitle : content.title}
									className="tease__thumbnail"
									src={content.thumbnailDefault}
								/>
							</a>
						</Link>
					)}
					<Link
						classList="tease__title"
						href={{ pathname: "/blog", query: { slug: content.slug } }}
					>
						<a>
							<h2>{content.seoTitle ? content.seoTitle : content.title}</h2>
						</a>
					</Link>
					<span className="tease__meta">
						Posted on {moment(content.date).format("DD/MM/YYYY")}
					</span>
					<p>{content.excerpt}</p>
					<Link
						classList="tease__continue"
						href={{ pathname: "/blog", query: { slug: content.slug } }}
					>
						<a>Continue Reading</a>
					</Link>
				</TeaseElement>
			);
		}

		return null;
	}
}
