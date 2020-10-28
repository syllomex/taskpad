import React, { DragEvent, useLayoutEffect, useRef } from 'react';
import { v4 } from 'uuid';

import EditableTitle from '../../components/EditableTitle';
import Line from '../../components/Line';

import { usePage } from '../../store/pages';

import Splash from '../Landing';

import { Container, EditableBox, Wrapper } from './styles';

const Main: React.FC = () => {
	const { setPageLines, activePage, setLineToEnd } = usePage();

	const editableBoxRef = useRef<HTMLDivElement>(null);

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.shiftKey) return;

		if (e.key === 'Enter') {
			e.preventDefault();

			if (!editableBoxRef.current || !activePage) return;

			setPageLines(
				[
					...activePage.content,
					{ id: v4(), text: editableBoxRef.current.innerText },
				],
				activePage
			);
			editableBoxRef.current.innerText = '';
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

	useLayoutEffect(() => {
		focusTextBox();
	}, [activePage]); // eslint-disable-line

	return (
		<Wrapper>
			{activePage && (
				<Container>
					<EditableTitle />

					{activePage?.content?.map((line, index) => (
						<Line
							key={index}
							line={line}
							index={index}
							focusTextBox={focusTextBox}
						/>
					))}

					{activePage && (
						<EditableBox
							style={{ minHeight: '100%', width: '100%' }}
							ref={editableBoxRef}
							onKeyDown={handleKeyDown}
							onDrop={handleDrop}
						/>
					)}
				</Container>
			)}
			{!activePage && <Splash />}
		</Wrapper>
	);
};

export default Main;
