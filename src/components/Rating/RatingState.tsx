'use client';

import { useState, useEffect, type JSX } from 'react';
import { Rating } from './Rating';
import { createClient } from '@supabase/supabase-js';

// Создайте клиент Supabase
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const RatingState = ({ productId }: { productId: number }): JSX.Element => {
	const [rating, setRating] = useState<number>(0); // Начальный рейтинг — 0
	const [isLoading, setIsLoading] = useState<boolean>(true); // Состояние загрузки

	useEffect(() => {
		const fetchRating = async () => {
			try {
				// Получение рейтинга продукта из базы данных
				const { data, error } = await supabase
					.from('Products')
					.select('rating')
					.eq('id', productId)
					.single(); // Используем single для получения одной записи

				if (error) {
					console.error('Ошибка загрузки рейтинга:', error);
					return;
				}

				if (data && data.rating !== undefined) {
					setRating(data.rating); // Устанавливаем полученный рейтинг
				} else {
					console.warn('Рейтинг отсутствует для продукта с ID:', productId);
				}
			} catch (err) {
				console.error('Непредвиденная ошибка при загрузке рейтинга:', err);
			} finally {
				setIsLoading(false); // Завершаем состояние загрузки
			}
		};

		fetchRating();
	}, [productId]);

	// Пока данные загружаются, отображаем индикатор загрузки
	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	return (
		<Rating
			rating={rating}
			isEditable
			setRating={setRating}
			productId={productId}
		/>
	);
};
