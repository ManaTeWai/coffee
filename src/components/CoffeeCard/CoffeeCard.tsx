'use client';

import Link from 'next/link';
import { Htag, P } from '..';
import styles from './CoffeeCard.module.css';
import Image from 'next/image';
import { useEffect, useState, type JSX } from 'react';
import { supabase } from '@/utils/supabase';

export const CoffeeCard = (): JSX.Element => {
	const [cards, setCards] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				// Запрос данных из таблицы Products
				const { data, error } = await supabase
					.from('Products')
					.select('*')
					.order('id', { ascending: true });

				if (error) {
					console.error('Ошибка загрузки данных:', error);
				} else {
					setCards(data || []);
				}
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCards();
	}, []);

	if (loading) {
		// Показываем placeholder во время загрузки
		return (
			<div className={styles.cardContainer}>
				{new Array(8).fill(null).map((_, index) => (
					<div className={styles.LoadingCard} key={`placeholder-${index}`}>
						<div className={styles.imagePlaceholder} />
						<div className={styles.skeleton} />
						<div className={styles.skeleton} />
						<div className={styles.skeleton} />
					</div>
				))}
			</div>
		);
	}

	// Рендерим карточки продуктов
	return (
		<div className={styles.cardContainer}>
			{cards.map((card) => (
				<Link key={card.id} href={`/product/${card.id}`} className={styles.link}>
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
