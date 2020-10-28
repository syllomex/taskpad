import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Settings from './components/Settings';
import SideNav from './components/SideNav';

// Screens
import Main from './screens/Main';
import { Wrapper } from './screens/Main/styles';

export const Routes: React.FC = () => {
	return (
		<HashRouter>
			<Switch>
				<Wrapper>
					<SideNav />
					<Route path="/" exact component={Main} />
					<Route path="/settings" exact component={Settings} />
				</Wrapper>
			</Switch>
		</HashRouter>
	);
};
