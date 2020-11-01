import React from 'react';

import { ActivePageIcon, Container, PageIcon, PageName, Link } from './styles';

interface Props {
	id: string;
	title: string;
	active?: boolean;
	onClick: React.Dispatch<string>;
	onRightClick: React.Dispatch<string>;
}

const PageItem: React.FC<Props> = ({
	id,
	active,
	title,
	onClick,
	onRightClick,
}) => {
	return (
		<Container
			onContextMenu={() => onRightClick(id)}
			onClick={() => onClick(id)}
		>
			<Link key={id} to="/" tabIndex={-1}>
				{active ? <ActivePageIcon /> : <PageIcon />}
				<PageName>{title}</PageName>
			</Link>
		</Container>
	);
};

export default PageItem;
