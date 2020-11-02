import styled from 'styled-components';

import page from '../../assets/icons/page.svg';
import pageActive from '../../assets/icons/page-active.svg';

import { Link as RouterLink } from 'react-router-dom';

export const Container = styled.div.attrs({ className: 'page-item' })<{
	dragging?: boolean;
}>`
	cursor: pointer;

	display: flex;
	align-items: center;

	width: 100%;
	padding: 0 32px;

	box-shadow: ${(props) =>
		props.dragging ? '0px -8px 6px -7px var(--primary)' : 'unset'};
	padding-top: ${(props) => (props.dragging ? '12px' : 0)};

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

export const Link = styled(RouterLink)`
	text-decoration: none;
	display: flex;
	align-items: center;
	width: 100%;
	outline: 0;
`;

export const PageIcon = styled.img.attrs({ src: page })``;
export const ActivePageIcon = styled.img.attrs({ src: pageActive })``;
