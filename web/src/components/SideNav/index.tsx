import React, { useState } from 'react';

import PageItem from '../PageItem';

import { usePage } from '../../store/pages';

import { Container, Footer, PagesContainer, Wrapper } from './styles';

import NewPageModal from '../NewPageModal';
import IconButton from '../IconButton';

import newPage from '../../assets/icons/new-page.svg';
import newPageActive from '../../assets/icons/new-page-active.svg';

const SideNav: React.FC = () => {
	const { pages, activePage, selectPage, removePage } = usePage();

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
							active={activePage?.id === page.id}
							onClick={() => selectPage(page)}
							onRightClick={removePage}
						/>
					))}
				</PagesContainer>
			</Container>
			<Footer>
				<IconButton
					activeIcon={newPageActive}
					inactiveIcon={newPage}
					onClick={() => setNewPageModal(true)}
					imageStyle={ButtonStyle}
				/>
			</Footer>

			<NewPageModal state={newPageModal} setState={setNewPageModal} />
		</Wrapper>
	);
};

const ButtonStyle = {
	width: '48px',
	height: '48px',
};

export default SideNav;
