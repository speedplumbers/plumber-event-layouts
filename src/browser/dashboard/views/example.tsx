import { render } from "../../render";
import React from 'react';
import { useReplicant } from "@nodecg/react-hooks"

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
