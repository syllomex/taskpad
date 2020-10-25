import React from 'react';
import EditableTitle from '../../components/EditableTitle';
import SideNav from '../../components/SideNav';

import { Container, Wrapper } from './styles';

const Main: React.FC = () => {
	return (
		<Wrapper>
			<SideNav />
			<Container>
				<EditableTitle />
			</Container>
		</Wrapper>
	);
};

export default Main;
