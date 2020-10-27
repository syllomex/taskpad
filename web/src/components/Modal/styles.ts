import styled from 'styled-components';

export const Container = styled.div`
	position: absolute;
	margin: auto;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;

	width: 500px;
	height: fit-content;
	background-color: var(--background-primary);

	border-radius: 4px;
	padding: 32px;

	z-index: 10;

	animation: fade-in .1s ease-in forwards;

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;
