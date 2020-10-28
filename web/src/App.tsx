import React, { useLayoutEffect, useRef, useState } from 'react';

import { GlobalStyles } from './assets/styles/GlobalStyles';

import Modal, { ModalHandles } from './store/Modal';
import { ModalContext } from './store/modal';

import { Routes } from './routes';

import { PageContext, PageProvider } from './store/pages';

function App() {
	const { pages, setPages, activePage, setActivePage } = PageProvider();
	const [modalRef, setModalRef] = useState<React.RefObject<ModalHandles>>();

	const refModal = useRef<ModalHandles>(null);

	useLayoutEffect(() => {
		if (refModal.current) setModalRef(refModal);
	}, []);

	return (
		<ModalContext.Provider value={{ modalRef, setModalRef }}>
			<PageContext.Provider
				value={{ pages, setPages, activePage, setActivePage }}
			>
				<Modal ref={refModal} />
				<Routes />
				<GlobalStyles />
			</PageContext.Provider>
		</ModalContext.Provider>
	);
}

export default App;
