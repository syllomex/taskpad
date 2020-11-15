import React from 'react';
import { Link } from 'react-router-dom';

import { useModal } from '../../store/modal';
import { Page, usePage } from '../../store/pages';
import { useConfig } from '../../store/config';

import IconButton from '../IconButton';

import NewPage from '../NewPage';
import Settings from '../Settings';

import { Container, MenuContainer, PageItem, PagesContainer } from './styles';

import newPage from '../../assets/icons/new-page.svg';
import newPageActive from '../../assets/icons/new-page-active.svg';
import home from '../../assets/icons/home.svg';
import homeActive from '../../assets/icons/home-active.svg';
import settings from '../../assets/icons/settings.svg';
import settingsActive from '../../assets/icons/settings-active.svg';

const SideNavMinimal: React.FC = () => {
	const {
		pages,
		activePage,
		setActivePage,
		removePage,
		selectPage,
	} = usePage();
	const { openModal } = useModal();
	const { config } = useConfig();

	const handleClick = (page: Page) => {
		if (page.id !== activePage?.id) setActivePage(page);
	};

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
			confirmation: true,
		});
	};

	const openNewPageModal = () => {
		openModal({
			content: <NewPage />,
			confirmation: false,
			disableShortcuts: true,
		});
	};

	const openSettingsModal = () => {
		openModal({
			confirmation: false,
			backButtonOnly: true,
			content: <Settings />,
		});
	};

	if (!config.minimal) return null;

	return (
		<Container>
			<PagesContainer>
				{pages.map((page) => (
					<PageItem
						key={page.id}
						active={page.id === activePage?.id}
						onClick={() => handleClick(page)}
						onContextMenu={() => handleRightClick(page.id)}
					/>
				))}
			</PagesContainer>
			<MenuContainer>
				<Link to="/" tabIndex={-1}>
					<IconButton
						activeIcon={homeActive}
						inactiveIcon={home}
						imageStyle={ButtonStyle}
						onClick={() => selectPage(null)}
						title="Atalho: Ctrl + H"
					/>
				</Link>
				<Link to="/" tabIndex={-1}>
					<IconButton
						activeIcon={newPageActive}
						inactiveIcon={newPage}
						onClick={openNewPageModal}
						imageStyle={ButtonStyle}
						title="Atalho: Ctrl + N"
					/>
				</Link>
				<IconButton
					onClick={openSettingsModal}
					activeIcon={settingsActive}
					inactiveIcon={settings}
					imageStyle={ButtonStyle}
					title="Atalho: Ctrl + O"
				/>
			</MenuContainer>
		</Container>
	);
};

const ButtonStyle = {
	width: '24px',
	height: '24px',
	marginTop: '12px'
};

export default SideNavMinimal;
