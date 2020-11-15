/* eslint-disable react-hooks/exhaustive-deps */
import React, { DragEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import PageItem from '../PageItem';
import NewPage from '../NewPage';
import IconButton from '../IconButton';
import Settings from '../Settings';

import { usePage } from '../../store/pages';
import { useModal } from '../../store/modal';

import { Container, Dropzone, Footer, PagesContainer, Wrapper } from './styles';

import newPage from '../../assets/icons/new-page.svg';
import newPageActive from '../../assets/icons/new-page-active.svg';
import home from '../../assets/icons/home.svg';
import homeActive from '../../assets/icons/home-active.svg';
import settings from '../../assets/icons/settings.svg';
import settingsActive from '../../assets/icons/settings-active.svg';
import { useConfig } from '../../store/config';

const SideNav: React.FC = () => {
	const {
		pages,
		activePage,
		selectPage,
		removePage,
		goToNextPage,
		goToPrevPage,
		setPageToEnd,
	} = usePage();
	const { openModal } = useModal();
	const { config } = useConfig();

	const history = useHistory();

	const shortcutListeners = (e: KeyboardEvent) => {
		if (e.ctrlKey) {
			if (e.key.toLowerCase() === 'n') openNewPageModal();
			else if (e.key.toLowerCase() === 'o') openSettingsModal();
			else if (e.key.toLowerCase() === 'h') gotoHome();
			else if (!e.shiftKey && e.key === 'Tab') goToNextPage();
			if (e.shiftKey) {
				if (e.key === 'Tab') goToPrevPage();
			}
		}
	};

	function gotoHome() {
		history.push('/');
		selectPage(null);
	}

	useEffect(() => {
		window.addEventListener('keydown', shortcutListeners);
		return () => {
			window.removeEventListener('keydown', shortcutListeners);
		};
	}, [pages, activePage]);

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

	function onDrop(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		const data = e.dataTransfer.getData('text/plain');
		if (data.length > 4) return;

		const dragging = parseInt(data, 10);
		setPageToEnd(dragging);
	}

	return (
		<Wrapper minimal={config.minimal}>
			<Container>
				<PagesContainer>
					{pages.map((page, index) => (
						<PageItem
							key={page.id}
							index={index}
							id={page.id}
							title={page.title}
							active={activePage?.id === page.id}
							onClick={() => selectPage(page)}
							onRightClick={() => handleRightClick(page.id)}
						/>
					))}
				</PagesContainer>
			</Container>
			<Dropzone onDragOver={(e) => e.preventDefault()} onDrop={onDrop} />
			<Footer>
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
			</Footer>
		</Wrapper>
	);
};

const ButtonStyle = {
	width: '48px',
	height: '48px',
};

export default SideNav;
