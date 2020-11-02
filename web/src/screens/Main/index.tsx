import React, { DragEvent, useLayoutEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import EditableTitle from '../../components/EditableTitle';
import Line from '../../components/Line';

import { usePage } from '../../store/pages';

import Splash from '../Landing';

import { Container, EditableBox, Wrapper } from './styles';

const Main: React.FC = () => {
	const { setPageLines, activePage, setLineToEnd, setActivePage } = usePage();
	const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
	const [editingLine, setEditingLine] = useState<number | null>(null);

	const highlightedLineIndexRef = useRef<number | null>(null);

	const editableBoxRef = useRef<HTMLDivElement>(null);

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.shiftKey) return;

		if (e.key === 'Enter') {
			e.preventDefault();

			if (!editableBoxRef.current || !activePage) return;
			if (editableBoxRef.current.innerText === '') return;

			setPageLines(
				[
					...activePage.content,
					{ id: v4(), text: editableBoxRef.current.innerText },
				],
				activePage
			);
			editableBoxRef.current.innerText = '';
		} else if (e.ctrlKey && e.key.toLowerCase() === 'w') {
			setActivePage(null);
		} else if (e.key === 'ArrowUp') {
			if (!activePage) return;
			const index = activePage.content.length;
			setHighlightedLine(index);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			return;
		}
	}

	function focusTextBox() {
		if (!editableBoxRef.current || !activePage) return;
		editableBoxRef.current.focus();
	}

	function handleDrop(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		const lineId = e.dataTransfer.getData('text/plain');
		setLineToEnd(lineId);
	}

	function arrowsListener(e: KeyboardEvent) {
		if (!activePage) return;

		const linesCount = activePage.content.length;
		if (e.key === 'ArrowDown') {
			e.preventDefault();

			if (highlightedLineIndexRef.current === null) return;
			editableBoxRef.current?.blur();

			if (highlightedLineIndexRef.current === linesCount - 1) {
				setHighlightedLine(null);
				highlightedLineIndexRef.current = null;
				editableBoxRef.current?.focus();
				return;
			}

			setHighlightedLine((currentLine) => {
				if (currentLine === null) {
					highlightedLineIndexRef.current = 0;
					return 0;
				}
				const index = Math.min(currentLine + 1, linesCount - 1);
				highlightedLineIndexRef.current = index;
				return index;
			});
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			editableBoxRef.current?.blur();

			setHighlightedLine((currentLine) => {
				if (!currentLine) {
					highlightedLineIndexRef.current = 0;
					return 0;
				}
				const index = Math.max(currentLine - 1, 0);
				highlightedLineIndexRef.current = index;
				return index;
			});
		} else if (e.key === 'Enter') {
			onEditLine();
		} else if (e.key === 'Escape') {
			focusTextBox();
		}
	}

	function onEditLine() {
		setEditingLine((currentLine) => {
			if (
				currentLine !== null &&
				currentLine !== highlightedLineIndexRef.current
			) {
				return highlightedLineIndexRef.current;
			}
			if (currentLine !== null) return null;
			return highlightedLineIndexRef.current;
		});
	}

	function onTitleFocus() {
		setEditingLine(null);
		setHighlightedLine(null);
		highlightedLineIndexRef.current = null;
	}

	function handleFocusEditableBox() {
		setHighlightedLine(null);
		highlightedLineIndexRef.current = null;
	}

	useLayoutEffect(() => {
		focusTextBox();
		window.addEventListener('keydown', arrowsListener);
		return () => {
			window.removeEventListener('keydown', arrowsListener);
		};
	}, [activePage]); // eslint-disable-line

	return (
		<Wrapper>
			{activePage && (
				<Container>
					<EditableTitle onFocus={onTitleFocus} />

					{activePage?.content?.map((line, index) => (
						<Line
							key={index}
							line={line}
							index={index}
							focusTextBox={focusTextBox}
							highlighted={index === highlightedLine}
							onClick={() => {
								setHighlightedLine(index);
								highlightedLineIndexRef.current = index;
							}}
							editing={editingLine === index}
							onDoubleClick={onEditLine}
						/>
					))}

					{activePage && (
						<EditableBox
							style={{ minHeight: '100%', width: '100%' }}
							ref={editableBoxRef}
							onKeyDown={handleKeyDown}
							onDrop={handleDrop}
							onFocus={handleFocusEditableBox}
						/>
					)}
				</Container>
			)}
			{!activePage && <Splash />}
		</Wrapper>
	);
};

export default Main;
