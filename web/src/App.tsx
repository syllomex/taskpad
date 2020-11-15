import React from 'react';

import { GlobalStyles } from './assets/styles/GlobalStyles';
import Modal from './components/Modal';
import { Routes } from './routes';
import { ConfigProvider } from './store/config';

import { ModalProvider } from './store/modal';
import { PageContext, PageProvider } from './store/pages';

function App() {
	const { pages, setPages, activePage, setActivePage } = PageProvider();

	return (
		<ConfigProvider>
			<ModalProvider>
				<PageContext.Provider
					value={{ pages, setPages, activePage, setActivePage }}
				>
					<Modal />
					<Routes />
					<GlobalStyles />
				</PageContext.Provider>
			</ModalProvider>
		</ConfigProvider>
	);
}

export default App;
