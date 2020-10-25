import React, { useEffect, useRef } from 'react';
import { usePage } from '../../store/pages';

import { Title } from './styles';

const EditableTitle: React.FC = () => {
	const { changeTitle, activePage } = usePage();

	const titleRef = useRef<HTMLHeadingElement>(null);
	const previousTitle = useRef<string>();
	const canceled = useRef(false);

	useEffect(() => {
		const blurListener = () => {
			if (canceled.current) return;

			const title = titleRef.current?.innerText;

			if (!titleRef.current || !previousTitle.current || !activePage) return;

			if (title && title.length > 0) {
				changeTitle(activePage, title);
			} else {
				titleRef.current.innerText = previousTitle.current;
			}
		};

		const keyListener = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				canceled.current = true;

				if (titleRef.current && previousTitle.current) {
					titleRef.current.innerText = previousTitle.current;
					titleRef.current.blur();
				}
			}

			if (e.key === 'Enter') {
				e.preventDefault();
				if (titleRef.current) {
					titleRef.current.blur();
				}
			}
		};

		const focusListener = () => {
			canceled.current = false;
			previousTitle.current = titleRef.current?.innerText;
		};

		titleRef.current?.addEventListener('focusin', focusListener);
		titleRef.current?.addEventListener('blur', blurListener);
		titleRef.current?.addEventListener('keydown', keyListener);

		return () => {
			titleRef.current?.removeEventListener('focusin', focusListener); // eslint-disable-line
			titleRef.current?.removeEventListener('blur', blurListener); // eslint-disable-line
			titleRef.current?.removeEventListener('keydown', keyListener); // eslint-disable-line
		};
	}, [activePage]); // eslint-disable-line

	if (!activePage) return null;

	return (
		<Title ref={titleRef} suppressContentEditableWarning contentEditable>
			{activePage.title}
		</Title>
	);
};

export default EditableTitle;
