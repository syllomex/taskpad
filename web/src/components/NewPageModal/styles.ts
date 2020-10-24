import styled from 'styled-components';

export const Container = styled.div`
	position: absolute;
	margin: auto;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;

	width: 500px;
	height: 300px;
	background-color: var(--background-primary);

	border-radius: 4px;
	padding: 32px;

	z-index: 10;
`;

export const Title = styled.span`
	display: block;
	font-size: 1.8rem;
	font-weight: bold;
	margin-bottom: 2rem;
`;

export const Input = styled.input`
	font-size: 1.3rem;
	padding: 0.8rem;

	background-color: var(--background-secondary);
	border-radius: 4px;
	width: 100%;
`;
