import React, { useLayoutEffect, useRef } from 'react';

import EditableTitle from '../../components/EditableTitle';
import SideNav from '../../components/SideNav';

import { usePage } from '../../store/pages';

import Splash from '../Splash';

import {
	CheckBox,
	CheckIcon,
	Container,
	EditableBox,
	Line as StyledLine,
	LineContainer,
	Wrapper,
} from './styles';

const Main: React.FC = () => {
	const { setPageLines, activePage } = usePage();

	const editableBoxRef = useRef<HTMLDivElement>(null);
	const lastLineRef = useRef<HTMLSpanElement>(null);

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.shiftKey) return;

		if (e.key === 'Enter') {
			e.preventDefault();

			if (!editableBoxRef.current || !activePage) return;

			setPageLines(
				[
					...activePage.content,
					{
						text: editableBoxRef.current.innerText,
						position: activePage.content.length + 1,
					},
				],
				activePage
			);
			editableBoxRef.current.innerText = '';
		}
	}

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

			if (!activePage) return;

			const text = e.currentTarget.innerText;
			activePage.content[index].text = text;

			e.currentTarget.blur();
			editableBoxRef.current?.focus();
		}
	}

	function handleCheck(line_index: number) {
		if (!activePage) return;
		const currentLines = [...activePage.content];
		currentLines[line_index].checked = !currentLines[line_index].checked;
		setPageLines(currentLines, activePage);
	}

	useLayoutEffect(() => {
		if (!editableBoxRef.current || !activePage) return;

		editableBoxRef.current.focus();
	}, [activePage]);

	return (
		<Wrapper>
			<SideNav />
			{activePage && (
				<Container>
					<EditableTitle />

					{activePage?.content?.map((line, index) => (
						<LineContainer key={index}>
							<CheckBox onClick={() => handleCheck(index)}>
								{line.checked && <CheckIcon />}
							</CheckBox>
							<StyledLine
								isChecked={line.checked}
								onKeyDown={(e) => handleLineKeyDown(e, index)}
								ref={
									index === activePage.content.length - 1 ? lastLineRef : null
								}
							>
								{line.text}
							</StyledLine>
						</LineContainer>
					))}

					{activePage && (
						<EditableBox
							style={{ minHeight: '100%', width: '100%' }}
							ref={editableBoxRef}
							onKeyDown={handleKeyDown}
						/>
					)}
				</Container>
			)}
			{!activePage && <Splash />}
		</Wrapper>
	);
};

export default Main;
