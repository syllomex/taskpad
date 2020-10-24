import React, { useState } from 'react';
import PageItem from '../PageItem';

import { Container, Footer, PagesContainer, Wrapper } from './styles';

const SideNav: React.FC = () => {
	const [activePage, setActivePage] = useState('Página 1');

	return (
		<Wrapper>
			<Container>
				<PagesContainer>
					{pages.map(page => <PageItem key={page} title={page} active={activePage === page} onClick={setActivePage} />)}
				</PagesContainer>
			</Container>
			<Footer>
				Footer
			</Footer>
		</Wrapper>
	);
};

const pages = [
	'Página 1',
	'Página 2',
	'Página 3',
	'Página 4',
	'Página 5',
	'Página 6',
	'Página 7',
	'Página 8',
	'Página 9',
	'Página 10',
	'Página 11',
	'Página 12',
	'Página 13',
	'Página 14',
	'Página 15',
	'Página 16',
	'Página 17',
	'Página 18',
	'Página 19',
	'Página 20',
	'Página 21',
	'Página 22',
];

export default SideNav;
