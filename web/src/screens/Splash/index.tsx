import React from 'react';

import { Container, SplashImage, Title, SubTitle, CodeBox, Link } from './styles';

const Splash: React.FC = () => {
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
		</Container>
	);
};

export default Splash;
