import { P } from '@/components';
import styles from './PriceDisplay.module.css';
import { type JSX } from 'react';

type PriceDisplayProps = {
    price: number;
};

export const PriceDisplay = ({ price }: PriceDisplayProps): JSX.Element => {
    return (
        <P size="large">
            Цена: <span className={styles.price}>{price} РУБ.</span>
        </P>
    );
};