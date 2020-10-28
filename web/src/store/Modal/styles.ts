import styled from 'styled-components';

export const ContentContainer = styled.div`
	margin-top: 1.1rem;
`;

export const ButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;

	margin-top: 2rem;
`;

export const Button = styled.button`
	padding: 1rem 2rem;
	border: 0.5px solid var(--text-regular);

	&:hover {
		opacity: 0.7;
	}
	&:active {
		opacity: 0.5;
	}

	&:not(:last-child) {
		margin-right: 1rem;
	}
`;
