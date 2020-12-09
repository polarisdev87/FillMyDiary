import React from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "@storybook/react/demo";

import HR from "../components/atoms/HR";

storiesOf("Horizontal Rule", module)
	.add("with text", () => (
		<>
			<p>Text</p>
			<HR />
			<p>Text</p>
		</>
	))
	.add("Invisible", () => (
		<>
			<p>Text</p>
			<HR invisible={true} size="sm" />
			<p>Text</p>
		</>
	));
