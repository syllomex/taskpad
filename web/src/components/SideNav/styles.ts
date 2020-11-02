import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&:hover {
		div.footer {
			height: 60px;
			align-items: center;
		}

		div.dropzone {
			width: 300px;
		}

		div.container {
			width: 300px;
			overflow-y: auto;

			span.page-name {
				opacity: unset;
			}

			div.page-item {
				padding-left: 16px;
				padding-right: 16px;
			}
		}
	}
`;

export const Container = styled.div.attrs({ className: 'container' })`
	width: 100px;

	padding: 16px 0;

	background-color: var(--background-secondary);

	span {
		opacity: 0;
	}

	overflow-y: hidden;
	overflow-x: hidden;

	::-webkit-scrollbar {
		width: 1px;
	}

	::-webkit-scrollbar-thumb {
		background-color: var(--primary);
	}
`;

export const Dropzone = styled.div.attrs({ className: 'dropzone' })`
	display: flex;
	flex: 1;
	width: 100px;
	background-color: var(--background-secondary);
`;

export const PagesContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	text-overflow: ellipsis;
	white-space: nowrap;
	overflow-x: hidden;
`;

export const Footer = styled.div.attrs({ className: 'footer' })`
	display: flex;
	justify-content: space-around;

	width: 100%;
	height: 0;

	border-top: 3px solid var(--line);
	background-color: var(--background-secondary);
`;
