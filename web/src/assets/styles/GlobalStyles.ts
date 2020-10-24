import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	button, input, textarea {
		outline: 0;
		border: 0;
	}

	:root {
		--primary: #0288D1;
		--background-primary: #282C34;
		--background-secondary: #1C1F25;
		--text-regular: #FEFEFE;
		--text-muted: #767676;
		--danger: #E17A6C;
	}
`;
