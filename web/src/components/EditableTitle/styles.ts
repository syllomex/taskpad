import styled from 'styled-components';

export const Title = styled.h1`
	cursor: pointer;
	padding: 1rem 3rem;

	&:focus {
		cursor: unset;
		background-color: var(--background-secondary);
		outline: 0;
		opacity: 1 !important;
	}

	&:hover {
		opacity: 0.6;
		background-color: var(--background-secondary);
	}

	margin-bottom: 1.5rem;
`;
