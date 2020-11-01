import React from 'react';
import { useModal } from '../../store/modal';

import { usePage } from '../../store/pages';

import Form from '../Form';
import Input from '../Input';

import { Title, AddButton, CancelButton } from './styles';

const NewPage: React.FC = () => {
	const { createPage } = usePage();
	const { closeModal } = useModal();

	function handleData(data: { title: string }) {
		createPage(data.title);
		closeModal();
	}

	return (
		<Form handleData={handleData}>
			<Title>Criar Página</Title>
			<Input
				defaultValue="Nova página"
				placeholder="Título"
				name="title"
				autoSelect
			/>
			<AddButton type="submit">Criar</AddButton>
			<CancelButton type="button" onClick={closeModal}>
				Voltar
			</CancelButton>
		</Form>
	);
};

export default NewPage;
