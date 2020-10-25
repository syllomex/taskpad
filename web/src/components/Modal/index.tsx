import React, { useEffect } from 'react';

import { Container } from './styles';

interface Props {
	state: boolean;
	setState: React.Dispatch<boolean>;
}

const Modal: React.FC<Props> = ({ state, setState, children }) => {
	useEffect(() => {
		function listener(event: KeyboardEvent) {
			if (event.key === 'Escape') setState(false);
		}

		window.addEventListener('keydown', listener, false);

		return () => {
			window.removeEventListener('keydown', listener, false);
		};
	}, []); // eslint-disable-line

	if (state)
		return (
			<>
				<div className="overlay" onClick={() => setState(false)} />
				<Container>{children}</Container>
			</>
		);
	else return null;
};

export default Modal;
