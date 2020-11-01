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

	animation: pop-in 0.1s ease-in forwards;

	@keyframes pop-in {
		from {
			opacity: 0;
			transform: scale(0.7);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
`;

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
