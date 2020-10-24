import React from 'react';

import { GlobalStyles } from './assets/styles/GlobalStyles';
import { Routes } from './routes';
import { PageContext, PageProvider } from './store/pages';

function App() {
	const { pages, setPages, activePage, setActivePage } = PageProvider();

	return (
		<>
			<PageContext.Provider
				value={{ pages, setPages, activePage, setActivePage }}
			>
				<Routes />
				<GlobalStyles />
			</PageContext.Provider>
		</>
	);
}

export default App;
