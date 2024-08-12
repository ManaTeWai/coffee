import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface FooterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: ReactNode;
	mask: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}