'use client';

import Link from 'next/link';
import { Htag, P } from '..';
import styles from './CoffeeCard.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Card } from '@/utils/products';

export const CoffeeCard = (): JSX.Element => {
	const [cards, setCards] = useState<Card[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCards = async () => {
			const { data, error } = await supabase
				.from('Products')
				.select('*');

			if (error) {
				console.error('Ошибка загрузки данных:', error);
			} else {
				console.log(data);
				setCards(data || []);
			}
			setLoading(false);
		};

		fetchCards();
	}, []);

	if (loading) {
		return <div className={styles.cardContainer}>
			{new Array(8).fill(null).map((_, index) => (
				<div className={styles.LoadingCard} key={`placeholder-${index}`}>
					<div className={styles.imagePlaceholder} />
					<div className={styles.skeleton} />
					<div className={styles.skeleton} />
					<div className={styles.skeleton} />
				</div>
			))}
		</div>;
	}

	return (
		<div className={styles.cardContainer}>
			{cards.map((card, index) => (
				<Link key={index} href={`/product/${index + 1}`} className={styles.link}>
					<div className={styles.card}>
						<Image src={card.imageUrl} alt={card.title} width={200} height={200} className={styles.image} />
						<Htag tag='h1' className={styles.title}>{card.title}</Htag>
						<P size='medium' className={styles.description}>{card.description}</P>
						<P size='large'>Цена: <span className={styles.price}>{card.price} РУБ.</span></P>
					</div>
				</Link>
			))}
		</div>
	);
};
