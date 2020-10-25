import styled from 'styled-components';

export const Button = styled.button`
	width: 100%;
	background-color: var(--primary);

	font-size: 1.3rem;
	padding: 1.2rem;

	&:hover {
		opacity: 0.7;
	}

	&:active {
		opacity: 0.5;
	}
`;
