import React from 'react';
import downloadData from '../../utils/downloadData';

import {
	Container,
	SplashImage,
	Title,
	SubTitle,
	CodeBox,
	Link,
} from './styles';

const Splash: React.FC = () => {
	function handleClickBackup() {
		const json = localStorage.getItem('pages');
		if (!json) return;

		const pages = JSON.parse(json);
		downloadData(pages);
	}

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
		</Container>
	);
};

export default Splash;
