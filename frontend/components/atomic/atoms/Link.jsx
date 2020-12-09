import Link from "next/link";
import { withRouter } from "next/router";
import { Children } from "react";
import React from "react";
import styled, { ThemeProvider } from "styled-components";

export default withRouter(
	({ router, children, as, href, classList, ...rest }) => (
		<Link {...rest} href={href} as={as}>
			{React.cloneElement(Children.only(children), {
				className:
					router.asPath === href || router.asPath === as
						? `active` + classList
						: classList
			})}
		</Link>
	)
);
