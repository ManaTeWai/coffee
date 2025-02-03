import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProductContentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	productId: number;
}