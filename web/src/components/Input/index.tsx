import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { Container, Label, Input as StyledInput } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	name: string;
	autoSelect?: boolean;
}

const Input: React.FC<Props> = ({ label, name, autoSelect, ...props }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	function handleAutoSelect() {
		if (autoSelect) inputRef.current?.select();
	}

	useEffect(() => {
		handleAutoSelect();
	}, [inputRef]); // eslint-disable-line

	return (
		<Container>
			{label && <Label htmlFor={props.id || name}>{label}</Label>}
			<StyledInput ref={inputRef} name={name} {...props} />
		</Container>
	);
};

export default Input;
