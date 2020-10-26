import React, { useEffect, useState } from 'react';

import PageItem from '../PageItem';

import { usePage } from '../../store/pages';

import { Container, Footer, PagesContainer, Wrapper } from './styles';

import NewPageModal from '../NewPageModal';
import IconButton from '../IconButton';

import newPage from '../../assets/icons/new-page.svg';
import newPageActive from '../../assets/icons/new-page-active.svg';
import home from '../../assets/icons/home.svg';
import homeActive from '../../assets/icons/home-active.svg';

const SideNav: React.FC = () => {
	const {
		pages,
		activePage,
		selectPage,
		removePage,
	} = usePage();

	const [newPageModal, setNewPageModal] = useState(false);

	const newPageShortcutListener = (e: KeyboardEvent) => {
		console.log('event');
		if (!e.ctrlKey) return;
		if (e.key.toLowerCase() === 'n') setNewPageModal(true);
	};
	useEffect(() => {
		window.addEventListener('keydown', newPageShortcutListener);

		return () => {
			window.removeEventListener('keydown', newPageShortcutListener);
		};
	}, []);

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
					activeIcon={homeActive}
					inactiveIcon={home}
					imageStyle={ButtonStyle}
					onClick={() => selectPage(null)}
				/>
				<IconButton
					activeIcon={newPageActive}
					inactiveIcon={newPage}
					onClick={() => setNewPageModal(true)}
					imageStyle={ButtonStyle}
					title="Atalho: Ctrl + N"
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
