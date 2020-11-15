import styled from 'styled-components';

export const Container = styled.div`
	display: flex;

	flex-direction: column;
	justify-content: space-between;
`;

export const PagesContainer = styled.div`
	display: flex;

	padding: 8px 6px;
	height: 75%;

	flex-direction: column;
	align-items: center;

	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0;
	}
`;

export const PageItem = styled.div<{ active?: boolean }>`
	cursor: pointer;

	display: flex;
	flex-shrink: 0;

	width: 16px;
	height: 16px;
	border-radius: 50%;

	background-color: var(--background-primary-reverse);

	opacity: ${(props) => (props.active ? 0.7 : 0.2)};

	&:hover {
		opacity: 0.4;
	}

	&:active {
		opacity: 0.1;
	}

	margin-bottom: 16px;
`;

export const MenuContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;

	height: 25%;
`;
