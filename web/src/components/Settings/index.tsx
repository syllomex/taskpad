/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useModal } from '../../store/modal';
import { Page, usePage } from '../../store/pages';

import downloadData, { uploadData } from '../../utils/backup';
import { savePagesInStorage } from '../../utils/storage';

const Settings: React.FC = () => {
	const { openModal, closeModal } = useModal();
	const { setPages, setActivePage } = usePage();

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
		setActivePage(uploadContent[0]);
		closeModal();
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
			<b>Ctrl + N</b>: Nova página
			<br />
			<b>Ctrl + H</b>: Volta ao início
			<br />
			<b>Ctrl + N</b>: Abre as configurações
			<br />
			<br />
			<h4>
				<u>Na edição de página</u>
			</h4>
			<b>Seta para Cima</b>: Navega para linha de cima
			<br />
			<b>Seta para Baixo</b>: Navega para linha de baixo
			<br />
			<b>Enter</b>: Edita linha selecionada
			<br />
			<b>Delete</b>: Remove linha selecionada
			<br />
			<b>Esc</b>: Foca o cursor na caixa de texto
			<br />
			<br />
			<h4>
				<u>Na janela de confirmação</u>
			</h4>
			<b>S </b>ou <b>Enter</b>: Seleciona "SIM"
			<br />
			<b>N</b>: Seleciona "NÃO"
			<br />
			<br />
			Clique com o <b>botão direito</b> em uma página para removê-la
			<br />
			Clique com o <b>botão direito</b> em uma linha para removê-la
			<br />
			Dê um <b>clique duplo</b> em uma linha para editá-la
			<br/>
			<b>Clique e arraste</b> uma linha para movê-la
			<br/>
			<b>Clique e arraste</b> uma página para movê-la
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
`;

export default Settings;
