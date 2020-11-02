import { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
	getNextPage,
	getPageById,
	getPageIndex,
	getPreviousPage,
	hasNextPage,
	hasPreviousPage,
} from '../utils/pageNavigation';

import {
	getActivePageIdFromStorage,
	getPagesFromStorage,
	removeActivePageFromStorage,
	saveActivePageInStorage,
	savePagesInStorage,
} from '../utils/storage';

export interface Line {
	id: string;
	text?: string;
	checked?: boolean;
}

export interface Page {
	id: string;
	title: string;
	content: Line[];
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
			const storageActivePageId = getActivePageIdFromStorage();

			if (storageActivePageId) {
				const storageActivePage = getPageById(
					storageActivePageId,
					storagePages
				);
				setActivePage(storageActivePage);
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

	const selectPage = (page: Page | null) => {
		setActivePage(page);
		if (page) saveActivePageInStorage(page.id);
		else removeActivePageFromStorage();
	};

	const clearSelectedPage = () => {
		setActivePage(null);
		localStorage.removeItem('active_page');
	};

	const createPage = (title: string) => {
		const page: Page = {
			id: uuid(),
			title,
			content: [],
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

	const changeTitle = (page: Page, title: string) => {
		const pageIndex = getPageIndex(page, pages);
		const currentPages = [...pages];

		currentPages[pageIndex] = {
			...currentPages[pageIndex],
			title,
		};

		setPages(currentPages);
		savePagesInStorage(currentPages);
		selectPage(currentPages[pageIndex]);
	};

	const setPageLines = (lines: Line[], page: Page) => {
		const pageIndex = getPageIndex(page, pages);
		const currentPages = [...pages];

		currentPages[pageIndex].content = lines;

		setPages(currentPages);
		savePagesInStorage(currentPages);
	};

	const setLineAboveId = (line_id: string, above_id: string) => {
		if (!activePage) return;

		const lineIndex = activePage.content.findIndex(
			(line) => line.id === line_id
		);
		const aboveLineIndex = activePage.content.findIndex(
			(line) => line.id === above_id
		);

		const offset = lineIndex < aboveLineIndex ? 1 : 0;

		const currentLines = [...activePage.content];
		const splicedLine = currentLines.splice(lineIndex, 1)[0];
		currentLines.splice(aboveLineIndex - offset, 0, splicedLine);

		setPageLines(currentLines, activePage);
	};

	const setLineToEnd = (line_id: string) => {
		if (!activePage) return;

		const lineIndex = activePage.content.findIndex(
			(line) => line.id === line_id
		);

		const currentLines = [...activePage.content];
		const splicedLine = currentLines.splice(lineIndex, 1);

		currentLines.push(splicedLine[0]);
		setPageLines(currentLines, activePage);
	};

	const saveAll = () => {
		savePagesInStorage(pages);
		if (activePage) saveActivePageInStorage(activePage.id);
	};

	const goToNextPage = () => {
		if (!activePage) {
			selectPage(pages[0]);
			return;
		}

		const activeIndex = pages.findIndex((page) => page.id === activePage.id);

		if (hasNextPage(pages, activeIndex)) {
			selectPage(getNextPage(activeIndex, pages));
		} else {
			if (pages[0]) selectPage(pages[0]);
		}
	};

	const goToPrevPage = () => {
		if (!activePage) {
			selectPage(pages[0]);
			return;
		}

		if (!activePage) return;
		const activeIndex = pages.findIndex((page) => page.id === activePage.id);

		if (hasPreviousPage(pages, activeIndex)) {
			selectPage(getPreviousPage(activeIndex, pages));
		} else {
			if (pages.length > 0) {
				selectPage(pages[pages.length - 1]);
			}
		}
	};

	const setPageAbove = (page_index: number, above_index: number) => {
		const currentPages = [...pages];

		const offset = page_index < above_index ? 1 : 0;
		const movingPage = currentPages.splice(page_index, 1)[0];
		currentPages.splice(above_index - offset, 0, movingPage);

		setPages(currentPages);
		saveAll();
	};

	const setPageToEnd = (page_index: number) => {
		const currentPages = [...pages];
		const movingPage = currentPages.splice(page_index, 1)[0];
		currentPages.push(movingPage);
		setPages(currentPages);
		saveAll();
	};

	return {
		pages,
		setPages,
		activePage,
		setActivePage,
		selectPage,
		createPage,
		removePage,
		changeTitle,
		setPageLines,
		setLineAboveId,
		setLineToEnd,
		saveAll,
		goToNextPage,
		goToPrevPage,
		setPageAbove,
		setPageToEnd,
	};
};

export { PageContext, PageProvider, usePage };
