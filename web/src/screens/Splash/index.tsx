/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '../../store/modal';
import { Page, usePage } from '../../store/pages';
import downloadData, { uploadData } from '../../utils/backup';
import { savePagesInStorage } from '../../utils/storage';

import {
	Container,
	SplashImage,
	Title,
	SubTitle,
	CodeBox,
	Link,
} from './styles';

const Splash: React.FC = () => {
	const [uploadContent, setUploadContent] = useState<Page[] | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { openModal } = useModal();

	const { setPages } = usePage();

	function handleClickBackup() {
		const json = localStorage.getItem('pages');
		if (!json) return;

		const pages = JSON.parse(json);
		downloadData(pages);
	}

	async function handleUpload() {
		if (!fileInputRef.current?.files) return;
		uploadData(fileInputRef.current.files[0], setUploadContent);
	}

	function handleChange() {
		openModal({
			title: 'Restaurar Backup',
			onConfirm: () => handleUpload(),
			content: (
				<p>
					Esta ação irá sobreescrever seus dados.
					<br />
					Tem certeza de que deseja continuar?
				</p>
			),
		});
	}

	useEffect(() => {
		if (!uploadContent) return;
		setPages(uploadContent);
		savePagesInStorage(uploadContent);
	}, [uploadContent]);

	return (
		<Container>
			<SplashImage />
			<Title>
				Utilize o menu à esquerda para criar páginas e navegar entre elas!
			</Title>
			<SubTitle>
				... ou utilize o atalho <CodeBox>Ctrl + N</CodeBox>
			</SubTitle>
			<Link>Ver lista de atalhos</Link>
			<Link onClick={handleClickBackup}>Fazer backup</Link>
			<input
				type="file"
				onChange={handleChange}
				ref={fileInputRef}
				accept="application/json"
			/>
		</Container>
	);
};

export default Splash;
