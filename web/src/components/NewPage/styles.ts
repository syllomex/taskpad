import styled from 'styled-components';
import { Button } from '../Button/styles';

export const Title = styled.span`
	display: block;
	font-size: 1.8rem;
	font-weight: bold;
	margin-bottom: 2rem;
`;

export const AddButton = styled(Button)`
	margin-top: 2rem;
`;

export const CancelButton = styled(Button)`
	margin-top: 1rem;

	background-color: var(--background-secondary);
`;
