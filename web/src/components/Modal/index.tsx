/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { ModalOptions, useModal } from '../../store/modal';

import {
	Container,
	ContentContainer,
	ButtonsContainer,
	Button,
} from './styles';

const Modal: React.FC = () => {
	const { closeModal, lastModal, modals } = useModal();

	useEffect(() => {
		function listener(event: KeyboardEvent) {
			if (event.key === 'Escape') closeModal();

			let last = lastModal();

			if (!last) return;

			const isDisabledShortcut = !!last.disableShortcuts;

			if (
				(event.key.toLowerCase() === 's' || event.key === 'Enter') &&
				!isDisabledShortcut
			)
				handleConfirm(last);
			if (event.key.toLowerCase() === 'n' && !isDisabledShortcut)
				handleCancel(last);
		}
		window.addEventListener('keyup', listener, false);
		return () => {
			window.removeEventListener('keyup', listener, false);
		};
	}, [modals]);

	function handleConfirm(modal: ModalOptions) {
		if (modal.onConfirm) modal.onConfirm();
		closeModal();
	}

	function handleCancel(modal: ModalOptions) {
		if (modal.onCancel) modal.onCancel();
		closeModal();
	}

	if (!modals || modals.length === 0) return null;

	return (
		<>
			{modals.map((modal, index) => (
				<div key={index}>
					<div
						className="overlay"
						onClick={closeModal}
						style={{ zIndex: 50 + index }}
					/>
					<Container style={{ zIndex: 50 + index * 2 }}>
						{modal.title && <h2>{modal.title}</h2>}
						<ContentContainer>{modal.content}</ContentContainer>

						{!modal.backButtonOnly && modal.confirmation && (
							<ButtonsContainer>
								<Button onClick={() => handleConfirm(modal)}>
									{modal.confirmLabel || (
										<span>
											<u>S</u>IM
										</span>
									)}
								</Button>
								<Button onClick={() => handleCancel(modal)}>
									{modal.cancelLabel || (
										<span>
											<u>N</u>ÃO
										</span>
									)}
								</Button>
							</ButtonsContainer>
						)}

						{modal.backButtonOnly && (
							<ButtonsContainer>
								<Button onClick={closeModal}>
									{modal.backButtonLabel || 'VOLTAR'}
								</Button>
							</ButtonsContainer>
						)}
					</Container>
				</div>
			))}
		</>
	);
};

export default Modal;
