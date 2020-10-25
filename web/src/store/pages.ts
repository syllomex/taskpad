import { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
	getNextPage,
	getPreviousPage,
	hasNextPage,
	hasPreviousPage,
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
	activePage: Page | null;
	setActivePage: React.Dispatch<Page | null>;
}

const PageContext = createContext({} as IPageContext);

const PageProvider = (): IPageContext => {
	const [pages, setPages] = useState([] as Page[]);
	const [activePage, setActivePage] = useState<Page | null>(null);

	const [isLoaded, setIsLoaded] = useState(false);

	if (!isLoaded) {
		const storagePages = getPagesFromStorage();
		setPages(storagePages);

		if (storagePages.length > 0) {
			const activePage = getActivePageFromStorage(pages);
			if (!activePage) {
				setActivePage(storagePages[0]);
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
		activePage,
		setActivePage,
	};
};

const usePage = () => {
	const { pages, setPages, activePage, setActivePage } = useContext(
		PageContext
	);

	const selectPage = (page: Page) => {
		setActivePage(page);
		saveActivePageInStorage(page.id);
	};

	const clearSelectedPage = () => {
		setActivePage(null);
		localStorage.removeItem('active_page');
	};

	const createPage = (title: string) => {
		const page: Page = {
			id: uuid(),
			title,
		};

		const newPages = [...pages, page];

		setPages(newPages);
		savePagesInStorage(newPages);
		selectPage(page);
	};

	const removePage = (page_id: string) => {
		let removedIndex = -1;

		const newPages = pages.filter((page, index) => {
			if (page.id !== page_id) return page;
			removedIndex = index;
			return false;
		});

		if (activePage?.id === page_id) {
			if (hasNextPage(pages, removedIndex))
				selectPage(getNextPage(removedIndex, pages));
			else if (hasPreviousPage(pages, removedIndex))
				selectPage(getPreviousPage(removedIndex, pages));
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
