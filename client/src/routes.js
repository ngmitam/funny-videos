import React from "react";
import Home from "./components/Home";
import Share from "./components/Share";

const routes = [
	{
		id: 1,
		path: "/",
		exact: false,
		main: <Home />,
	},
	{
		id: 2,
		path: "/share",
		exact: false,
		main: <Share />,
	},
];

export default routes;
