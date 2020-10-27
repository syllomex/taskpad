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

export const EditableBox = styled.div.attrs({
	contentEditable: true,
	suppressContentEditableWarning: true,
})`
	min-height: 100%;
	width: 100%;

	padding: 0.3rem 3rem;

	&:focus {
		outline: 0;
	}
`;
