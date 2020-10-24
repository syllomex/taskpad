import React from 'react';

import PageItem from '../PageItem';

import { usePage } from '../../store/pages';

import { Container, Footer, PagesContainer, Wrapper } from './styles';

const SideNav: React.FC = () => {
	const { pages, activePage, selectPage, createPage, removePage } = usePage();

	return (
		<Wrapper>
			<Container>
				<PagesContainer>
					{pages.map((page) => (
						<PageItem
							key={page.id}
							id={page.id}
							title={page.title}
							active={activePage === page.id}
							onClick={selectPage}
							onRightClick={removePage}
						/>
					))}
				</PagesContainer>
			</Container>
			<Footer>
				<button type="button" onClick={createPage}>Nova Página</button>
			</Footer>
		</Wrapper>
	);
};

export default SideNav;
