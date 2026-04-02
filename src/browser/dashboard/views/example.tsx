import {useReplicant} from "@nodecg/react-hooks";
import React from "react";
import {render} from "../../render";

const App = () => {
	const [example] = useReplicant("example");

	return (
		<div id='container'>
			<div>{example}</div>
			<div>This is Panel.</div>
		</div>
	);
};

render(
	<>
		<App />
	</>,
);
