import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import ModalComponent from '../../components/Modal';
import { Button, ButtonsContainer, ContentContainer } from './styles';

export interface ModalHandles {
	open: ({ title, cancelLabel, confirmLabel, content }: ModalOptions) => void;
}

export interface ModalOptions {
	title: string;
	confirmLabel?: any;
	cancelLabel?: any;
	content?: any;
	onConfirm?: Function;
	onCancel?: Function;
	backButtonOnly?: boolean;
	backButtonLabel?: string;
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
			confirmLabel = (
				<span>
					<u>S</u>IM
				</span>
			),
			cancelLabel = (
				<span>
					<u>N</u>ÃO
				</span>
			),
			content = '',
			onConfirm,
			onCancel,
			backButtonOnly,
			backButtonLabel = 'VOLTAR',
		}: ModalOptions) => {
			setModal(true);

			setOptions({
				title,
				confirmLabel,
				cancelLabel,
				content,
				onConfirm,
				onCancel,
				backButtonOnly,
				backButtonLabel,
			});
		},
	}));

	const handleConfirm = useCallback(() => {
		if (options?.onConfirm && modal) options.onConfirm();
		setModal(false);
	}, [options]);

	const handleCancel = useCallback(() => {
		setModal(false);
		if (options?.onCancel && modal) options.onCancel();
	}, [options]);

	useEffect(() => {
		const keyListener = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() === 's') handleConfirm();
			else if (event.key.toLowerCase() === 'n') handleCancel();
		};

		window.addEventListener('keyup', keyListener);

		if (!modal) {
			window.removeEventListener('keyup', keyListener);
		}

		return () => {
			window.removeEventListener('keyup', keyListener);
		};
	}, [handleConfirm, handleCancel, modal]);

	return (
		<ModalComponent state={modal} setState={setModal} {...props}>
			<h2 ref={titleRef}>{options?.title}</h2>

			<ContentContainer ref={contentRef}>{options?.content}</ContentContainer>

			{!options?.backButtonOnly && (
				<ButtonsContainer>
					<Button ref={btnConfirmRef} onClick={handleConfirm}>
						{options?.confirmLabel}
					</Button>
					<Button ref={btnCancelRef} onClick={handleCancel}>
						{options?.cancelLabel}
					</Button>
				</ButtonsContainer>
			)}
			{options?.backButtonOnly && (
				<ButtonsContainer>
					<Button ref={btnCancelRef} onClick={() => setModal(false)}>
						{options?.backButtonLabel}
					</Button>
				</ButtonsContainer>
			)}
		</ModalComponent>
	);
};

export default forwardRef(Modal);
