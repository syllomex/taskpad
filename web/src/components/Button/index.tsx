import React, { ButtonHTMLAttributes } from 'react';

import { Button as StyledButton } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<Props> = ({ children, ...props }) => {
	return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
