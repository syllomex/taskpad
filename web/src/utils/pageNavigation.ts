import { Page } from '../store/pages';

export function hasNextPage(pages: Page[], index: number) {
	if (pages[index + 1]) return true;
	return false;
}

export function hasPreviousPage(pages: Page[], index: number) {
	if (pages[index - 1]) return true;
	return false;
}

export function nextPageId(pages: Page[], index: number) {
	return pages[index + 1].id;
}

export function previousPageId(pages: Page[], index: number) {
	return pages[index - 1].id;
}

export function getNextPage(current_index: number, pages: Page[]) {
	return pages[current_index + 1];
}

export function getPreviousPage(current_index: number, pages: Page[]) {
	return pages[current_index - 1];
}

export function getPageById(page_id: string, pages: Page[]): Page {
	const pageIndex = pages.findIndex((page) => page.id === page_id);
	return pages[pageIndex];
}

export function getPageIndex(page: Page, pages: Page[]): number {
	const pageIndex = pages.findIndex((curPage) => curPage.id === page.id);
	return pageIndex;
}
