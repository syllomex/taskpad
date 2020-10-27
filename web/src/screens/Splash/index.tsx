import React, { ChangeEvent, useEffect, useState } from 'react';
import { Page, usePage } from '../../store/pages';
import downloadData, { uploadData } from '../../utils/backup';

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

	const {setPages} = usePage();

	function handleClickBackup() {
		const json = localStorage.getItem('pages');
		if (!json) return;

		const pages = JSON.parse(json);
		downloadData(pages);
	}

	function handleUpload(e: ChangeEvent<HTMLInputElement>) {
		if (!e.currentTarget.files) return
		uploadData(e.currentTarget.files[0], setUploadContent);
	}

	useEffect(() => {
		if (!uploadContent) return;
		setPages(uploadContent);
	}, [uploadContent])

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
			<input type="file" name="backup" id="backup" onChange={handleUpload} />
		</Container>
	);
};

export default Splash;
