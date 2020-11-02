import styled from 'styled-components';

import check from '../../assets/icons/check.svg';

export const LineContainer = styled.div<{ highlighted?: boolean }>`
	display: flex;
	align-items: center;

	white-space: nowrap;
	overflow: hidden;

	padding: 0.15rem 0 0.15rem;

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

	${(props) =>
		props.highlighted
			? `		opacity: 0.6;
		background-color: var(--background-secondary);`
			: ``}
`;

export const Line = styled.span.attrs({
	contentEditable: false,
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
	opacity: ${(props) => (props.isChecked ? 0.6 : 1)};

	white-space: pre-wrap;
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

	padding-left: 0.05rem;
`;
