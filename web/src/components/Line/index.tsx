import React, {
	DragEvent,
	FocusEvent,
	MouseEvent,
	useEffect,
	useRef,
} from 'react';
import { useModal } from '../../store/modal';
import { Line as ILine, usePage } from '../../store/pages';

import {
	LineContainer,
	Line as StyledLine,
	CheckBox,
	CheckIcon,
} from './styles';

interface Props {
	line: ILine;
	index: number;
	focusTextBox: Function;
	highlighted?: boolean;
	onClick?: React.Dispatch<any>;
	editing?: boolean;
	onSubmitEditing?: Function;
	onDoubleClick?: Function;
	onBlur?: Function;
	onFocus?: Function;
}

const Line: React.FC<Props> = ({
	line,
	index,
	focusTextBox,
	highlighted,
	onClick,
	editing,
	onSubmitEditing,
	onDoubleClick,
	onBlur,
	onFocus,
}) => {
	const lineRef = useRef<HTMLDivElement>(null);
	const lineContentRef = useRef<HTMLSpanElement>(null);

	const isEditing = useRef(false);
	const isDragging = useRef(false);

	const { activePage, setPageLines, setLineAboveId, saveAll } = usePage();
	const { openModal } = useModal();

	function handleLineKeyDown(
		e: React.KeyboardEvent<HTMLSpanElement>,
		index: number
	) {
		if (e.key === 'Backspace' && !e.currentTarget.innerText) {
			if (!activePage) return;
			const currentLines = [...activePage.content];
			currentLines.splice(index, 1);

			setPageLines(currentLines, activePage);
		}

		if (e.shiftKey) return;

		if (e.key === 'Enter') {
			e.preventDefault();
			serializeLine();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			serializeLine();
			focusTextBox();
		}
	}

	function serializeLine() {
		if (!activePage || !lineRef.current) return;

		const text = lineRef.current.innerText;
		if (text === '') return;
		activePage.content[index].text = text;

		lineContentRef.current?.blur();
		if (onSubmitEditing) onSubmitEditing();
		saveAll();
	}

	function handleCheck(line_index: number) {
		if (!activePage) return;
		const currentLines = [...activePage.content];
		currentLines[line_index].checked = !currentLines[line_index].checked;
		setPageLines(currentLines, activePage);
	}

	function setDragImg(e: DragEvent<HTMLSpanElement>) {
		if (!lineRef.current || !e.dataTransfer) return;
		e.dataTransfer.setDragImage(
			lineRef.current,
			lineRef.current.getBoundingClientRect().x,
			10
		);
	}

	function setBlueShadow() {
		if (!lineRef.current) return;
		lineRef.current.style.boxShadow = '0px -8px 6px -7px var(--primary)';
		lineRef.current.style.paddingTop = '0.3rem';
	}

	function removeBlueShadow() {
		if (!lineRef.current) return;
		lineRef.current.style.boxShadow = 'unset';
		lineRef.current.style.paddingTop = '0';
	}

	function onDrop(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();

		if (!lineRef.current) return;

		removeBlueShadow();

		const draggingId = e.dataTransfer.getData('text/plain');
		const droppedId = e.currentTarget.id;

		setLineAboveId(draggingId, droppedId);
	}

	function handleFocusLine() {
		isEditing.current = true;
		document.execCommand('selectAll', false, undefined);

		onFocus && onFocus();
	}

	function handleBlurLine(e: FocusEvent<HTMLSpanElement>) {
		if (!activePage) return;
		if (!lineContentRef.current) return;
		if (lineContentRef.current.innerText === '') {
			const previousText = activePage.content[index].text as string;
			lineContentRef.current.innerText = previousText;
		}
		isEditing.current = false;
		e.currentTarget.contentEditable = 'false';
		serializeLine();

		onBlur && onBlur();
	}

	function handleDoubleClickLine(e: MouseEvent<HTMLSpanElement>) {
		e.currentTarget.contentEditable = 'true';
		e.currentTarget.focus();

		if (onDoubleClick) onDoubleClick();
	}

	function handleDragStartLine(e: DragEvent<HTMLSpanElement>) {
		if (!lineRef.current) return;

		if (isEditing.current) {
			e.preventDefault();
			return;
		}

		isDragging.current = true;

		lineRef.current.style.opacity = '0.1';
		setDragImg(e);

		e.dataTransfer.setData('text/plain', lineRef.current.id);
	}

	function handleDragEndLine() {
		if (!lineRef.current) return;
		lineRef.current.style.opacity = '1';
		isDragging.current = false;
	}

	function removeLine() {
		if (!activePage) return;
		const currentLines = [...activePage.content];
		currentLines.splice(index, 1);

		setPageLines(currentLines, activePage);
	}

	function handleRightClickLine() {
		openModal({
			title: 'Remover tarefa',
			content: <p>Tem certeza de que deseja remover essa tarefa?</p>,
			onConfirm: removeLine,
			confirmation: true,
		});
	}

	useEffect(() => {
		if (editing) {
			if (lineContentRef.current) {
				lineContentRef.current.contentEditable = 'true';
				lineContentRef.current.focus();
			}
		}
	}, [editing]);

	if (!activePage) return null;

	return (
		<LineContainer
			key={index}
			ref={lineRef}
			onDragEnter={setBlueShadow}
			onDragLeave={removeBlueShadow}
			id={line.id}
			onDrop={onDrop}
			onContextMenu={handleRightClickLine}
			highlighted={highlighted}
			onClick={onClick}
		>
			<CheckBox onClick={() => handleCheck(index)}>
				{line.checked && <CheckIcon />}
			</CheckBox>
			<StyledLine
				draggable
				isChecked={line.checked}
				onFocus={handleFocusLine}
				onBlur={handleBlurLine}
				onDoubleClick={handleDoubleClickLine}
				onDragStart={handleDragStartLine}
				onDragEnd={handleDragEndLine}
				onKeyDown={(e) => handleLineKeyDown(e, index)}
				onDragOver={(e) => e.preventDefault()}
				onDragEnter={(e) => e.preventDefault()}
				ref={lineContentRef}
			>
				{line.text}
			</StyledLine>
		</LineContainer>
	);
};

export default Line;
