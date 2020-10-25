import React, { FormEvent, useRef } from 'react';

interface Props {
	handleData?: React.Dispatch<any>;
}

const Form: React.FC<Props> = ({ handleData, children }) => {
	const formRef = useRef<HTMLFormElement>(null);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (!formRef.current) return;

		const form = new FormData(formRef.current);
		const object: any = {};

		form.forEach((value, key) => {
			object[key] = value;
		});

		if (handleData) handleData(object);
	}

	return (
		<form onSubmit={handleSubmit} ref={formRef}>
			{children}
		</form>
	);
};

export default Form;
