/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Settings from '../../components/Settings';
import { useModal } from '../../store/modal';

import {
	Container,
	SplashImage,
	Title,
	SubTitle,
	CodeBox,
	Link,
} from './styles';

const Splash: React.FC = () => {
	const { openModal } = useModal();

	return (
		<Container>
			<SplashImage />
			<Title>
				Utilize o menu à esquerda para criar páginas e navegar entre elas!
			</Title>
			<SubTitle>
				... ou utilize o atalho <CodeBox>Ctrl + N</CodeBox>
			</SubTitle>
			<Link
				onClick={() =>
					openModal({
						confirmation: false,
						backButtonOnly: true,
						content: <Settings />,
					})
				}
			>
				Ver dicas e atalhos
			</Link>
		</Container>
	);
};

export default Splash;
