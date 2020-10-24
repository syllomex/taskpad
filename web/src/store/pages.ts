import { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
	hasNextPage,
	hasPreviousPage,
	nextPageId,
	previousPageId,
} from '../utils/pageNavigation';

import {
	getActivePageFromStorage,
	getPagesFromStorage,
	saveActivePageInStorage,
	savePagesInStorage,
} from '../utils/storage';

export interface Line {
	index: number;
	text?: string;
	checked?: boolean;
}

export interface Page {
	id: string;
	title: string;
	content?: Line[];
}

interface IPageContext {
	pages: Page[];
	setPages: React.Dispatch<Page[]>;
	activePage: string;
	setActivePage: React.Dispatch<string>;
}

const PageContext = createContext({} as IPageContext);

const PageProvider = (): IPageContext => {
	const [pages, setPages] = useState([] as Page[]);
	const [activePage, setActivePage] = useState<string>();

	const [isLoaded, setIsLoaded] = useState(false);

	if (!isLoaded) {
		const storagePages = getPagesFromStorage();
		setPages(storagePages);

		if (storagePages.length > 0) {
			const activePage = getActivePageFromStorage();
			if (!activePage) {
				setActivePage(storagePages[0].id);
				saveActivePageInStorage(storagePages[0].id);
			} else {
				setActivePage(activePage);
			}
		}

		setIsLoaded(true);
	}

	return {
		pages,
		setPages,
		activePage: activePage || 'undefined',
		setActivePage,
	};
};

const usePage = () => {
	const { pages, setPages, activePage, setActivePage } = useContext(
		PageContext
	);

	const selectPage = (page_id: string) => {
		setActivePage(page_id);
		saveActivePageInStorage(page_id);
	};

	const clearSelectedPage = () => {
		setActivePage('undefined');
		localStorage.removeItem('active_page');
	};

	const createPage = () => {
		const page: Page = {
			id: uuid(),
			title: 'Nova Página',
		};

		const newPages = [...pages, page];

		setPages(newPages);
		savePagesInStorage(newPages);
		selectPage(page.id);
	};

	const removePage = (page_id: string) => {
		let removedIndex = -1;

		const newPages = pages.filter((page, index) => {
			if (page.id !== page_id) return page;
			removedIndex = index;
			return false;
		});

		if (activePage === page_id) {
			if (hasNextPage(pages, removedIndex))
				selectPage(nextPageId(pages, removedIndex));
			else if (hasPreviousPage(pages, removedIndex))
				selectPage(previousPageId(pages, removedIndex));
			else clearSelectedPage();
		}

		setPages(newPages);
		savePagesInStorage(newPages);
	};

	return {
		pages,
		setPages,
		activePage,
		setActivePage,
		selectPage,
		createPage,
		removePage,
	};
};

export { PageContext, PageProvider, usePage };
