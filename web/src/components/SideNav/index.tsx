import React, { useEffect, useState } from 'react';

import PageItem from '../PageItem';

import { usePage } from '../../store/pages';

import { Container, Footer, PagesContainer, Wrapper } from './styles';

import NewPageModal from '../NewPageModal';
import IconButton from '../IconButton';
import Settings from '../Settings';

import newPage from '../../assets/icons/new-page.svg';
import newPageActive from '../../assets/icons/new-page-active.svg';
import home from '../../assets/icons/home.svg';
import homeActive from '../../assets/icons/home-active.svg';
import settings from '../../assets/icons/settings.svg';
import settingsActive from '../../assets/icons/settings-active.svg';

import { useModal } from '../../store/modal';
import { Link, useHistory } from 'react-router-dom';

const SideNav: React.FC = () => {
	const { pages, activePage, selectPage, removePage } = usePage();

	const { openModal } = useModal();
	const history = useHistory();

	const [newPageModal, setNewPageModal] = useState(false);

	const newPageShortcutListener = (e: KeyboardEvent) => {
		if (!e.ctrlKey) return;
		if (e.key.toLowerCase() === 'n') setNewPageModal(true);
		if (e.key.toLowerCase() === 'h') history.push('/');
		if (e.key.toLowerCase() === 'o') history.push('/settings');
	};
	useEffect(() => {
		window.addEventListener('keydown', newPageShortcutListener);

		return () => {
			window.removeEventListener('keydown', newPageShortcutListener);
		};
	}, []);

	const handleRightClick = (page_id: string) => {
		openModal({
			title: 'Remover página',
			content: (
				<p>
					Tem certeza de que deseja remover essa página?
					<br />
					Esta ação é <b>irreversível!</b>
				</p>
			),
			onConfirm: () => removePage(page_id),
		});
	};

	return (
		<Wrapper>
			<Container>
				<PagesContainer>
					{pages.map((page) => (
						<PageItem
							id={page.id}
							title={page.title}
							active={activePage?.id === page.id}
							onClick={() => selectPage(page)}
							onRightClick={() => handleRightClick(page.id)}
						/>
					))}
				</PagesContainer>
			</Container>
			<Footer>
				<Link to="/">
					<IconButton
						activeIcon={homeActive}
						inactiveIcon={home}
						imageStyle={ButtonStyle}
						onClick={() => selectPage(null)}
						title="Atalho: Ctrl + H"
					/>
				</Link>
				<Link to="/">
					<IconButton
						activeIcon={newPageActive}
						inactiveIcon={newPage}
						onClick={() => setNewPageModal(true)}
						imageStyle={ButtonStyle}
						title="Atalho: Ctrl + N"
					/>
				</Link>
				<Link to="/settings">
					<IconButton
						activeIcon={settingsActive}
						inactiveIcon={settings}
						imageStyle={ButtonStyle}
						title="Atalho: Ctrl + O"
					/>
				</Link>
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
