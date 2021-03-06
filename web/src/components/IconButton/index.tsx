import React, { ButtonHTMLAttributes, useRef } from 'react';
import { Button } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	inactiveIcon: string;
	activeIcon: string;
	onClick?: React.Dispatch<any>;
	imageStyle?: any;
}

const IconButton: React.FC<Props> = ({
	activeIcon,
	inactiveIcon,
	onClick,
	imageStyle,
	...props
}) => {
	const imageRef = useRef<HTMLImageElement>(null);
	const iconUrl = useRef<string>(inactiveIcon);

	function handleMouseEnter() {
		if (imageRef.current) imageRef.current.src = activeIcon;
	}

	function handleMouseLeave() {
		if (imageRef.current) imageRef.current.src = inactiveIcon;
	}

	return (
		<Button
			type="button"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={onClick}
			{...props}
			tabIndex={-1}
		>
			<img ref={imageRef} src={iconUrl.current} style={imageStyle} alt="Ícone" />
		</Button>
	);
};

export default IconButton;
