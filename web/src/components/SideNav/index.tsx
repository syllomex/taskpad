import React, { useState } from 'react';

import PageItem from '../PageItem';

import { usePage } from '../../store/pages';

import { Container, Footer, PagesContainer, Wrapper } from './styles';
import NewPageModal from '../NewPageModal';

const SideNav: React.FC = () => {
	const { pages, activePage, selectPage, createPage, removePage } = usePage();

	const [newPageModal, setNewPageModal] = useState(false);

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
				<button type="button" onClick={() => setNewPageModal(true)}>
					Nova Página
				</button>
			</Footer>

			{newPageModal && (
				<NewPageModal state={newPageModal} setState={setNewPageModal} />
			)}
		</Wrapper>
	);
};

export default SideNav;
