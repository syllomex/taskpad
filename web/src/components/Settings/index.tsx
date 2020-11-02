/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useModal } from '../../store/modal';
import { Page, usePage } from '../../store/pages';

import downloadData, { uploadData } from '../../utils/backup';
import { savePagesInStorage } from '../../utils/storage';

const Settings: React.FC = () => {
	const { openModal } = useModal();
	const { setPages } = usePage();

	const [uploadContent, setUploadContent] = useState<Page[] | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUpload = () => {
		if (!fileInputRef.current?.files) return;
		if (!fileInputRef.current.files[0]) return;
		uploadData(fileInputRef.current.files[0], setUploadContent);
	};

	function handleChange() {
		openModal({
			title: 'Restaurar Backup',
			onConfirm: handleUpload,
			content: (
				<p>
					Esta ação irá <strong>sobreescrever seus dados</strong>.
					<br />
					Tem certeza de que deseja continuar?
				</p>
			),
			confirmation: true,
		});
	}

	useEffect(() => {
		if (!uploadContent) return;
		setPages(uploadContent);
		savePagesInStorage(uploadContent);
	}, [uploadContent]);

	function handleClickBackup() {
		const json = localStorage.getItem('pages');
		if (!json) return;

		const pages = JSON.parse(json);
		downloadData(pages);
	}

	return (
		<Container>
			<h1>Configurações</h1>
			<h2 style={{ marginTop: '2rem' }}>Backup e Restauração</h2>
			<p style={{ marginTop: '1rem', marginBottom: '.3rem' }}>
				Selecione um arquivo para restaurar suas páginas
			</p>
			<input
				type="file"
				onChange={handleChange}
				ref={fileInputRef}
				accept="application/json"
			/>
			<br /> <br />
			ou{' '}
			<button
				style={{ textDecoration: 'underline', fontSize: '1rem' }}
				onClick={handleClickBackup}
			>
				clique aqui
			</button>{' '}
			para fazer um backup agora.
			<br />
			<br />
			<h2>Comandos</h2>
			<br />
			<b>Alt + 1</b>: Navegar para página anterior
			<br />
			<b>Alt + 2</b>: Navegar para próxima página
			<br />
			<br />
			<b>Ctrl + N</b>: Nova página
			<br />
			<b>Ctrl + H</b>: Volta ao início
			<br />
			<b>Ctrl + N</b>: Abre as configurações
			<br />
			<br />
			<b>S (Janela de confirmação)</b>: Seleciona "SIM"
			<br />
			<b>N (Janela de confirmação)</b>: Seleciona "NÃO"
			<br />
			<br />
			Clique com o <b>botão direito</b> em uma página para removê-la
			<br />
			Clique com o <b>botão direito</b> em uma linha para removê-la
			<br />
			Dê um <b>clique duplo</b> em uma linha para editá-la
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
`;

export default Settings;
