import styled from 'styled-components';

import check from '../../assets/icons/check.svg';

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

export const LineContainer = styled.div`
	display: flex;
	align-items: center;

	margin-bottom: 0.3rem;

	cursor: pointer;

	&:focus-within {
		cursor: unset;
		background-color: var(--background-secondary);
		opacity: 1 !important;
	}

	&:hover {
		opacity: 0.6;
		background-color: var(--background-secondary);
	}
`;

export const Line = styled.span.attrs({
	contentEditable: true,
	suppressContentEditableWarning: true,
})<{ isChecked?: boolean }>`
	display: block;
	width: 100%;

	padding: 0.3rem 2rem 0.3rem 0.4rem;

	margin-left: 0.6rem;

	&:focus {
		outline: 0;
	}

	text-decoration: ${(props) => (props.isChecked ? 'line-through' : 'none')};
	opacity: ${props => props.isChecked ? 0.6 : 1};

	white-space: pre-wrap;
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

export const CheckBox = styled.div`
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: var(--background-primary-reverse);

	width: 1rem;
	height: 1rem;

	border-radius: 2px;

	&:hover {
		opacity: 0.7;
	}

	&:active {
		opacity: 0.5;
	}

	margin-left: 1rem;

	user-select: none;
`;

export const CheckIcon = styled.img.attrs({ src: check })`
	width: 80%;
	height: 80%;

	padding-left: .05rem;
`;
