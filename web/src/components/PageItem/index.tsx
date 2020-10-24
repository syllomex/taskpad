import React from 'react';

import { ActivePageIcon, Container, PageIcon, PageName } from './styles';

interface Props {
	active?: boolean;
	title: string;
	onClick: React.Dispatch<string>;
}

const PageItem: React.FC<Props> = ({ active, title, onClick }) => {
	return (
		<Container onClick={() => onClick(title)}>
			{active ? <ActivePageIcon /> : <PageIcon />}
			<PageName>{title}</PageName>
		</Container>
	);
};

export default PageItem;
