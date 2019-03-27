import React, { Component } from 'react';
import { getStockDataFromSocket } from './api';
import AppNavigation from './navigation/NavigationComponent';

class App extends Component {
	
	constructor(props) {
		super(props);
		getStockDataFromSocket((err, data) => {
			console.log(data);
		});
	}

	render() {
		return <AppNavigation />;
	}
}

export default App;
