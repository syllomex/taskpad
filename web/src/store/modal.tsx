import React, { useContext, useState } from 'react';
import { createContext } from 'react';

interface ModalContext {
	modals: ModalOptions[];
	setModals: React.Dispatch<
		ModalOptions[] | ((currentModals: ModalOptions[]) => ModalOptions[])
	>;
}

export interface ModalOptions {
	title?: string;
	content: any;
	confirmation: boolean;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm?: Function;
	onCancel?: Function;
	backButtonOnly?: boolean;
	backButtonLabel?: string;
	disableShortcuts?: boolean;
}

export const ModalContext = createContext<ModalContext>({} as ModalContext);

export const ModalProvider: React.FC = ({ children }) => {
	const [modals, setModals] = useState<ModalOptions[]>([]);

	return (
		<ModalContext.Provider value={{ modals, setModals }}>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const { modals, setModals } = useContext(ModalContext);

	/** Open a modal above other modals */
	const openModal = (props: ModalOptions) => {
		setModals((currentModals: ModalOptions[]) => [
			...currentModals,
			{ ...props },
		]);
	};

	/** Close the last opened modal */
	const closeModal = () => {
		if (modals.length === 0) return;

		const currentModals = [...modals];
		currentModals.splice(currentModals.length - 1, 1);
		setModals(currentModals);
	};

	/** Get the last opened modal */
	const lastModal = () => {
		if (modals.length === 0) return null;
		return modals[modals.length - 1];
	};

	return { modals, openModal, closeModal, lastModal };
};
