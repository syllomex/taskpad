import React from 'react';

import './app.css';
import { GlobalStyles } from './assets/styles/GlobalStyles';
import { Routes } from './routes';

function App() {
	return (
		<>
			<Routes />
			<GlobalStyles />
		</>
	);
}

export default App;
