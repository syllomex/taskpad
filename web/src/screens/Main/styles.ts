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

	@media (max-width: 1280px) {
		padding-left: 5%;
		padding-right: 5%;
	}

	overflow-y: auto;
	::-webkit-scrollbar {
		width: 1px;
	}

	::-webkit-scrollbar-thumb {
		background-color: var(--primary);
	}
`;

export const EditableBox = styled.div.attrs({
	contentEditable: true,
	suppressContentEditableWarning: true,
})`
	min-height: 100%;
	width: 100%;

	padding: 0.6rem 3rem 0.3rem;

	&:focus {
		outline: 0;
	}
`;
