'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { CoffeeCard } from '..';
import { fetchMoreProducts } from '@/services/fetchMoreProducts'; // Функция для получения дополнительных продуктов из Supabase
import { Card } from '@/utils/products';
import styles from './DynamicCoffeeCardLoader.module.css'

export const DynamicCoffeeCardLoader = () => {
	const [cards, setCards] = useState<Card[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	const loadMoreCards = useCallback(async () => {
		if (loading || !hasMore) return;
		setLoading(true);

		const newCards = await fetchMoreProducts(cards.length);
		if (newCards.length > 0) {
			setCards((prevCards) => [...prevCards, ...newCards]);
		} else {
			setHasMore(false);
		}

		setLoading(false);
	}, [loading, hasMore, cards.length]);

	useEffect(() => {
		loadMoreCards();
	}, [loadMoreCards]);

	useEffect(() => {
		const currentRef = loadMoreRef.current;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasMore) {
				loadMoreCards();
			}
		});

		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [loadMoreCards, hasMore]);

	return (
		<div>
			<CoffeeCard />
			{loading && 
				<div className={styles.cardContainer}>
					{new Array(4).fill(null).map((_, index) => (
						<div className={styles.card} key={`placeholder-${index}`}>
							<div className={styles.imagePlaceholder} />
							<div className={styles.skeleton} />
							<div className={styles.skeleton} />
							<div className={styles.skeleton} />
						</div>
					))}
				</div>
			}
			<div ref={loadMoreRef} />
		</div>
	);
};
