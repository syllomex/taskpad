import { Page } from '../store/pages';
import { v4 as uuid } from 'uuid';

function getPagesFromStorage(): Page[] {
	const storagePages = localStorage.getItem('pages');

	if (storagePages) {
		const pages: Page[] = JSON.parse(storagePages);
		return pages;
	}

	const defaultPage: Page = {
		id: uuid(),
		title: 'Nova página',
	};

	const pages = [defaultPage];
	savePagesInStorage(pages);

	return pages;
}

function savePagesInStorage(pages: Page[]) {
	const jsonPages = JSON.stringify(pages);
	localStorage.setItem('pages', jsonPages);
}

function getActivePageFromStorage(pages: Page[]): Page {
	const activePageId = localStorage.getItem('active_page');
	const activePageIndex = pages.findIndex((page) => page.id === activePageId);
	return pages[activePageIndex];
}

function saveActivePageInStorage(pageId: string) {
	localStorage.setItem('active_page', pageId);
}

export {
	getPagesFromStorage,
	savePagesInStorage,
	getActivePageFromStorage,
	saveActivePageInStorage,
};
