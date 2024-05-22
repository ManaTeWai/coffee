'use client'

import { useEffect, useState } from 'react';
import { CoffeeCard, Htag, P } from '@/components';
import { cards as initialCards } from '@/utils/products';
import styles from './DynamicCoffeeCardLoader.module.css';

type Card = {
	imageUrl: string;
	title: string;
	description: string;
	price: number;
};

export const DynamicCoffeeCardLoader = (): JSX.Element => {
	const [cards, setCards] = useState<Card[]>(initialCards.slice(0, 8));
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadMoreCards = () => {
			setCards((prevCards) => [
				...prevCards,
				...initialCards.slice(prevCards.length, prevCards.length + 4),
			]);
		};

		if (cards.length < initialCards.length) {
			const interval = setInterval(loadMoreCards, 2000);
			return () => clearInterval(interval);
		} else {
			setLoading(false);
		}
	}, [cards]);

	return (
		<>
			<CoffeeCard cards={cards} />
			{loading && (
				<div className={styles.cardContainer}>
					{new Array(4).fill(null).map((_, index) => (
						<div className={styles.card} key={`placeholder-${index}`}>
							<div className={styles.imagePlaceholder} />
							<Htag tag='h1' className={styles.title}>Загрузка...</Htag>
							<P size='medium' className={styles.description}>...</P>
							<P size='medium'>Цена: <span className={styles.price}>0 РУБ.</span></P>
						</div>
					))}
				</div>
			)}
		</>
	);
}
