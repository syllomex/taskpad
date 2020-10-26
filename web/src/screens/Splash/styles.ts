import styled from 'styled-components';

import splash from '../../assets/images/splash.svg';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	height: 100%;
	width: 100%;
`;

export const SplashImage = styled.div`
	background: url(${splash});
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;

	width: 100%;
	height: 70%;
`;

export const Title = styled.h1`
	font-family: 'Rajdhani';
	font-weight: bold;
`;

export const SubTitle = styled.h3`
	font-family: 'Rajdhani';
`;

export const CodeBox = styled.span`
	background-color: var(--background-secondary);
	padding: 0.2rem;
`;

export const Link = styled.span`
	cursor: pointer;
	margin-top: 1rem;
	text-decoration: underline;

	&:hover {
		opacity: 0.8;
	}
	&:active {
		opacity: 0.5;
	}

	user-select: none;
`;
