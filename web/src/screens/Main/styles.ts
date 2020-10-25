import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;

	height: 100%;
	width: 100%;

	overflow: hidden;
`;

export const Container = styled.div`
	width: 100%;

	padding: 2rem 20%;
`;

export const Title = styled.h1`
	cursor: pointer;
	padding: 1rem 2rem;

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
`;
