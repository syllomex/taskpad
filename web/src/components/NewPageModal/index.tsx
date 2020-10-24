import React, { FormEvent, useEffect, useLayoutEffect, useRef } from 'react';
import { usePage } from '../../store/pages';
import Button from '../Button';

import { Container, Input, Title } from './styles';

interface Props {
	state: boolean;
	setState: React.Dispatch<boolean>;
}

const NewPageModal: React.FC<Props> = ({ state, setState }) => {
	const titleInputRef = useRef<HTMLInputElement>(null);

	const { createPage } = usePage();

	useLayoutEffect(() => {
		titleInputRef.current?.focus();
		titleInputRef.current?.select();
	}, []);

	useEffect(() => {
		function listener(event: KeyboardEvent) {
			if (event.key === 'Escape') setState(false);
		}

		window.addEventListener('keydown', listener, false);

		return () => {
			window.removeEventListener('keydown', listener, false);
		};
	}, []);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		createPage(titleInputRef.current?.value || 'Nova página');
		if (titleInputRef.current?.value) {
			titleInputRef.current.value = '';
		}
		setState(false);
	}

	return (
		<>
			<div className="overlay" onClick={() => setState(false)} />
			<Container>
				<form onSubmit={handleSubmit}>
					<Title>Adicionar nova página</Title>
					<Input
						ref={titleInputRef}
						defaultValue="Nova página"
						placeholder="Título"
					/>
					<Button type="submit">Adicionar</Button>
				</form>
			</Container>
		</>
	);
};

export default NewPageModal;
