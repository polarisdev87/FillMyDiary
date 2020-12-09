import React, { Component } from "react";
import Head from "next/head";
import { Query } from "react-apollo";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";

import { perPage } from "../../../config";

import Link from "../../atomic/atoms/Link";

import ErrorMessage from "../../atomic/molecules/ErrorMessage";
import LoaderCircle from "../../atomic/molecules/loader/LoaderCircle";

import Reviews from "../../reviews/Reviews";

import UserContent from "./parts/content/UserContent";
import UserInformation from "./parts/UserInformation";

import { SINGLE_USER_QUERY } from "../../queries/user/SingleUser";

export default class UserProfile extends Component {
	render() {
		const { id, me } = this.props;

		if (me && me.id === id) {
			return (
				<Query
					fetchPolicy="network-only"
					query={SINGLE_USER_QUERY}
					variables={{ id: id }}
				>
					{({ error, loading, data }) => {
						if (error) return <ErrorMessage error={error} />;
						if (loading) return <LoaderCircle />;
						if (!data.user) return <p>No User Found for {id}</p>;
						const user = data.user;
						return (
							<React.Fragment>
								<Head>
									<title>Fill My Diary | {user.name}</title>
								</Head>
								<Row>
									<Col lg={9} push={{ lg: 3 }}>
										<UserContent me={me} user={user} />
									</Col>
									<Col lg={3} pull={{ lg: 9 }}>
										<UserInformation me={me} user={user} />
										<Reviews me={me} userID={id} />
									</Col>
								</Row>
							</React.Fragment>
						);
					}}
				</Query>
			);
		} else {
			return (
				<Query
					fetchPolicy="network-only"
					query={SINGLE_USER_QUERY}
					variables={{ id: id }}
				>
					{({ error, loading, data }) => {
						if (error) return <ErrorMessage error={error} />;
						if (loading) return <LoaderCircle />;
						if (!data.user) return <p>No User Found for {id}</p>;
						const user = data.user;
						return (
							<React.Fragment>
								<Head>
									<title>Fill My Diary | {user.name}</title>
								</Head>
								<Row>
									<Col lg={3}>
										<UserInformation user={user} />
									</Col>
								</Row>
							</React.Fragment>
						);
					}}
				</Query>
			);
		}
	}
}
