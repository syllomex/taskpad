import { Page } from '../store/pages';
import { v4 as uuid } from 'uuid';

function getPagesFromStorage(): Page[] {
	const storagePages = localStorage.getItem('pages');

	if (storagePages) {
		const pages: Page[] = JSON.parse(storagePages);

		if (pages.length > 0) return pages;
	}

	const alreadyCreatedDefaultPage = localStorage.getItem('default_page');
	if (alreadyCreatedDefaultPage) return [];

	const defaultPage: Page = {
		id: uuid(),
		title: 'Nova página',
		content: [],
	};

	const pages = [defaultPage];
	savePagesInStorage(pages);

	localStorage.setItem('default_page', 'true');

	return pages;
}

function savePagesInStorage(pages: Page[]) {
	const jsonPages = JSON.stringify(pages);
	localStorage.setItem('pages', jsonPages);
}

function getActivePageIdFromStorage(): string | null {
	return localStorage.getItem('active_page');
}

function saveActivePageInStorage(pageId: string) {
	localStorage.setItem('active_page', pageId);
}

function removeActivePageFromStorage() {
	localStorage.removeItem('active_page');
}

export {
	getPagesFromStorage,
	savePagesInStorage,
	getActivePageIdFromStorage,
	saveActivePageInStorage,
	removeActivePageFromStorage,
};
