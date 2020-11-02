import React, { DragEvent, useState } from 'react';
import { usePage } from '../../store/pages';

import { ActivePageIcon, Container, PageIcon, PageName, Link } from './styles';

import pageIcon from '../../assets/icons/page-active.svg';

interface Props {
	id: string;
	index: number;
	title: string;
	active?: boolean;
	onClick: React.Dispatch<string>;
	onRightClick: React.Dispatch<string>;
}

const PageItem: React.FC<Props> = ({
	id,
	index,
	active,
	title,
	onClick,
	onRightClick,
}) => {
	const { setPageAbove } = usePage();
	const [dragging, setDragging] = useState(false);

	function onDragStart(e: DragEvent<HTMLDivElement>) {
		setDragging(true);
		e.dataTransfer.setData('text/plain', index.toString());

		const image = new Image();
		image.src = pageIcon;

		e.dataTransfer.setDragImage(image, 16, 16);
	}

	function onDrop(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		const data = e.dataTransfer.getData('text/plain');
		if (data.length > 4) {
			setDragging(false);
			return;
		}

		const dropped = parseInt(data, 10);
		const on = index;

		setDragging(false);
		setPageAbove(dropped, on);
	}

	function onDragEnd() {
		setDragging(false);
	}

	function onDragEnter() {
		setDragging(true);
	}

	function onDragLeave() {
		setDragging(false);
	}

	function onDragOver(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
		setDragging(true);
	}

	return (
		<Container
			onContextMenu={() => onRightClick(id)}
			onClick={() => onClick(id)}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			onDragOver={onDragOver}
			dragging={dragging}
		>
			<Link key={id} to="/" tabIndex={-1}>
				{active ? <ActivePageIcon /> : <PageIcon />}
				<PageName>{title}</PageName>
			</Link>
		</Container>
	);
};

export default PageItem;
