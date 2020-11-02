import { Page } from '../store/pages';
import { v4 as uuid } from 'uuid';

function generateFeaturesPage(version: string, features: string[]): Page {
	let page: Page = { id: uuid(), title: `Features ${version}`, content: [] };

	features.forEach((feat) => {
		page.content.push({ id: uuid(), checked: false, text: feat });
	});

	return page;
}

function makeFeaturesPage(pages: Page[]): Page[] {
	const version = '1.1.0';
	const alreadyShown = localStorage.getItem(`feature.${version}`);
	if (alreadyShown) return pages;

	const features = [
		'Reduzido o tamanho mínimo da janela',
		'Navegação entre páginas com Ctrl + Tab',
		'Selecionar linhas com mouse ou setas do teclado',
		'Páginas arrastáveis',
		'Diversos novos atalhos (veja em configurações)',
	];

	const featuresPage = generateFeaturesPage(version, features);
	pages.push(featuresPage);

	savePagesInStorage(pages);
	saveActivePageInStorage(featuresPage.id);

	localStorage.setItem(`feature.${version}`, 'true');
	return pages;
}

function getPagesFromStorage(): Page[] {
	const storagePages = localStorage.getItem('pages');

	if (storagePages) {
		const pages: Page[] = JSON.parse(storagePages);

		if (pages.length > 0) return makeFeaturesPage(pages);
	}

	const alreadyCreatedDefaultPage = localStorage.getItem('default_page');
	if (alreadyCreatedDefaultPage) return makeFeaturesPage([]);

	const defaultPage: Page = {
		id: uuid(),
		title: 'Nova página',
		content: [],
	};

	const pages = [defaultPage];
	savePagesInStorage(pages);

	localStorage.setItem('default_page', 'true');

	// let lines: Line[] = [];

	// for (let i = 0; i < 1000; i++) {
	// 	lines.push({ id: uuid(), checked: Math.random() > 0.5 ? true : false, text: uuid() });
	// }

	// let page: Page = {id: uuid(), title: uuid(), content: lines}
	// let pages: Page[] = [];

	// for (let i = 0; i < 100; i++) {
	// 	pages.push({...page, id: uuid()});
	// }

	return makeFeaturesPage(pages);
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
