import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

// Screens
import Main from './assets/screens/Main';

export const Routes: React.FC = () => {
	return (
		<HashRouter>
			<Switch>
				<Route path="/" exact component={Main} />
			</Switch>
		</HashRouter>
	);
};
