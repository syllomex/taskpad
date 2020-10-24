import { Page } from "../store/pages";

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
