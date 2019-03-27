import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OHLCGraph from '../Containers/OHLCGraph';

const appNavigation = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={OHLCGraph} />
			</Switch>
		</Router>
	);
};

export default appNavigation;
