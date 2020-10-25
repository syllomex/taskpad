import React from 'react';

import { usePage } from '../../store/pages';

import Form from '../Form';
import Input from '../Input';
import Modal from '../Modal';

import { Title, AddButton, CancelButton } from './styles';

interface Props {
	state: boolean;
	setState: React.Dispatch<boolean>;
}

const NewPageModal: React.FC<Props> = ({ state, setState }) => {
	const { createPage } = usePage();

	function handleData(data: { title: string }) {
		createPage(data.title);
		setState(false);
	}

	return (
		<Modal state={state} setState={setState}>
			<Form handleData={handleData}>
				<Title>Criar Página</Title>
				<Input
					defaultValue="Nova página"
					placeholder="Título"
					name="title"
					autoSelect
				/>
				<AddButton type="submit">Criar</AddButton>
				<CancelButton type="button" onClick={() => setState(false)}>
					Voltar
				</CancelButton>
			</Form>
		</Modal>
	);
};

export default NewPageModal;
