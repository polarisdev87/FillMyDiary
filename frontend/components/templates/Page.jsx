import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import "../../assets/scss/style.scss";

import ThemeWrapper from "./ThemeWrapper";

import CurrentUser from "../queries/user/CurrentUser";

import Meta from "../atomic/particles/Meta";
import SEO from "../atomic/particles/SEO";

import Cookies from "../atomic/molecules/notification/Cookies";
import InternetExploder from "../atomic/molecules/notification/InternetExploder";

import Footer from "../footer/Footer";
import Header from "../header/Default";

const Page = ({ background, children, ua, yoast }) => {
	return (
		<ThemeWrapper background={background}>
			<CurrentUser>
				{({ data: { me } }) => (
					<>
						<Meta />
						<SEO yoast={yoast} />
						<Header currentUser={me} />
						<section className="wrapper">
							<main id="content" role="main" className="content-wrapper">
								<Container fluid>
									<Row>
										<Col>
											{React.Children.map(children, child =>
												React.cloneElement(child, { me: me })
											)}
										</Col>
									</Row>
								</Container>
							</main>
						</section>
						<Footer currentUser={me} />
						<Cookies />
						{ua && <InternetExploder ua={ua} />}
					</>
				)}
			</CurrentUser>
		</ThemeWrapper>
	);
};

export default Page;
