import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	:root {
		--primary: #0288D1;

		--background-primary: #282C34;
		--background-secondary: #1C1F25;
		--background-primary-reverse: #FEFEFE;

		--line: #202328;

		--text-regular: #FEFEFE;
		--text-muted: #767676;

		--danger: #E17A6C;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;

		color: var(--text-regular);
		font-family: 'Open Sans';

		transition-duration: .1s;
	}

	html, body, #root {
		width: 100vw;
		height: 100vh;
		background-color: var(--background-primary);
	}

	button, input, textarea {
		outline: 0;
		border: 0;
		background-color: transparent;
	}

	button {
		cursor: pointer;
	}

	.overlay {
		position: fixed;
		left: 0;
		top: 0;

		display: flex;
		justify-content: center;
		align-items: center;

		width: 100vw;
		height: 100vh;

		z-index: 5;

		background-color: rgba(0, 0, 0, 0.7);
	}
`;
