'use client';

import { useEffect, useState, type JSX } from 'react';
import { RatingProps } from './Rating.Props';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import cn from 'classnames';
import { createClient } from '@supabase/supabase-js';

// Инициализация Supabase клиента
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const Rating = ({ rating, setRating, productId, isEditable = false, ...props }: RatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	// Конструируем массив звезд при изменении рейтинга
	useEffect(() => {
		constructRating(rating);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rating]);

	// Генерация рейтинговых звезд
	const constructRating = (currentRating: number) => {
		const updatedArray = new Array(5).fill(null).map((_, i) => (
			<StarIcon
				key={i}
				className={cn(styles.star, {
					[styles.filled]: i < currentRating,
					[styles.editable]: isEditable,
				})}
				onMouseEnter={() => changeDisplay(i + 1)}
				onClick={() => handleClick(i + 1)}
			/>
		));
		setRatingArray(updatedArray);
	};

	// Изменение отображения рейтинга при наведении
	const changeDisplay = (i: number) => {
		if (!isEditable) return;
		constructRating(i);
	};

	// Обработка клика по звезде
	const handleClick = async (i: number) => {
		if (!isEditable || !setRating) return;

		// Проверяем, оставлял ли пользователь рейтинг ранее
		const userRated = localStorage.getItem(`rated_${productId}`);
		if (userRated) {
			alert('Вы уже оставили оценку!');
			return;
		}

		// Сохраняем выбор пользователя
		localStorage.setItem(`rated_${productId}`, String(i));
		setRating(i);

		if (!productId) {
			console.error('Product ID отсутствует');
			return;
		}

		// Получение текущего рейтинга и количества голосов
		const { data: productData, error: fetchError } = await supabase
			.from('Products')
			.select('rating, ratings_count')
			.eq('id', productId)
			.single();

		if (fetchError) {
			console.error('Ошибка при получении данных продукта:', fetchError);
			return;
		}

		const { rating: currentRating, ratings_count: ratingsCount } = productData;

		// Рассчитываем новый средний рейтинг
		const newRatingsCount = ratingsCount + 1;
		const newRating = ((currentRating * ratingsCount) + i) / newRatingsCount;

		// Обновляем данные в базе
		const { error: updateError } = await supabase
			.from('Products')
			.update({ rating: newRating, ratings_count: newRatingsCount })
			.eq('id', productId);

		if (updateError) {
			console.error('Ошибка при обновлении рейтинга:', updateError);
		}
	};

	// Рендеринг компонента
	return (
		<div {...props} onMouseLeave={() => changeDisplay(rating)}>
			{ratingArray.map((r, i) => (
				<span key={i}>{r}</span>
			))}
		</div>
	);
};
