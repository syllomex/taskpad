import styled from 'styled-components';

import page from '../../assets/icons/page.svg';
import pageActive from '../../assets/icons/page-active.svg';

export const Container = styled.div.attrs({ className: 'page-item' })`
	cursor: pointer;

	display: flex;
	align-items: center;

	width: 100%;
	padding: 0 32px;

	&:not(:last-child) {
		padding-bottom: 1.2rem;
	}

	&:hover {
		opacity: 0.7;
	}

	&:active {
		opacity: 0.5;
	}
`;

export const PageName = styled.span.attrs({ className: 'page-name' })`
	display: block;
	overflow-x: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	margin-left: 8px;
	font-size: 1.1rem;

	font-family: 'Open Sans';
`;

export const PageIcon = styled.img.attrs({ src: page })``;
export const ActivePageIcon = styled.img.attrs({ src: pageActive })``;
