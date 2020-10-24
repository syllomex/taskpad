import React from 'react';
import SideNav from '../../components/SideNav';

import { Container, Wrapper } from './styles';

const Main: React.FC = () => {
	return (
		<Wrapper>
			<SideNav />
			<Container>
				<h1>Main</h1>
			</Container>
		</Wrapper>
	);
};

export default Main;
