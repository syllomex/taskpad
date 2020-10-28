import React, {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import ModalComponent from '../../components/Modal';

export interface ModalHandles {
	open: ({ title, cancelLabel, confirmLabel, content }: ModalOptions) => void;
}

export interface ModalOptions {
	title: string;
	confirmLabel?: string;
	cancelLabel?: string;
	content?: any;
	onConfirm?: Function;
	onCancel?: Function;
}

const Modal: React.ForwardRefRenderFunction<ModalHandles, any> = (
	props,
	ref
) => {
	const [modal, setModal] = useState(false);

	const [options, setOptions] = useState<ModalOptions>();

	const titleRef = useRef<HTMLHeadingElement>(null);
	const contentRef = useRef<HTMLParagraphElement>(null);
	const btnConfirmRef = useRef<HTMLButtonElement>(null);
	const btnCancelRef = useRef<HTMLButtonElement>(null);

	useImperativeHandle(ref, () => ({
		open: ({
			title = 'Título',
			confirmLabel = 'SIM',
			cancelLabel = 'NÃO',
			content = '',
			onConfirm,
			onCancel,
		}: ModalOptions) => {
			setModal(true);

			setOptions({
				title,
				confirmLabel,
				cancelLabel,
				content,
				onConfirm,
				onCancel,
			});
		},
	}));

	function handleConfirm() {
		setModal(false);
		if (options?.onConfirm) options.onConfirm();
	}

	function handleCancel() {
		setModal(false);
		if (options?.onCancel) options.onCancel();
	}

	return (
		<ModalComponent state={modal} setState={setModal} {...props}>
			<h2 ref={titleRef}>{options?.title}</h2>

			<div ref={contentRef}>{options?.content}</div>

			<button ref={btnConfirmRef} onClick={handleConfirm}>
				{options?.confirmLabel}
			</button>
			<button ref={btnCancelRef} onClick={handleCancel}>
				{options?.cancelLabel}
			</button>
		</ModalComponent>
	);
};

export default forwardRef(Modal);
