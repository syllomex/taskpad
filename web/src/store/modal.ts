import { useCallback, useContext } from 'react';
import { createContext } from 'react';
import { ModalOptions } from './Modal';

interface IModalContext {
	modalRef: any;
	setModalRef: React.Dispatch<any>;
}

export const ModalContext = createContext<IModalContext>(
	{} as IModalContext
);

export const useModal = () => {
	const { modalRef, setModalRef } = useContext(
		ModalContext
	);

	const openModal = useCallback(
		({ ...options }: ModalOptions) => {
			if (modalRef && modalRef.current?.open)
				modalRef.current.open(options);
		},
		[modalRef]
	);

	return {
		modalRef,
		setModalRef,
		openModal,
	};
};
