'use client';

import { useEffect, useState } from 'react';
import { RatingProps } from './Rating.Props';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import cn from 'classnames';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const Rating = ({ rating, setRating, productId, isEditable = false, ...props }: RatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => (
			<StarIcon
				key={i}
				className={cn(styles.Star, {
					[styles.filled]: i < currentRating,
					[styles.editable]: isEditable
				})}
				onMouseEnter={() => changeDisplay(i + 1)}
				onClick={() => handleClick(i + 1)}
			/>
		));
		setRatingArray(updatedArray);
	};

	const changeDisplay = (i: number) => {
		if (!isEditable) {
			return;
		}
		constructRating(i);
	};

	const handleClick = async (i: number) => {
		if (!isEditable || !setRating) {
			return;
		}

		// Проверка, оставлял ли пользователь оценку ранее
		const userRated = localStorage.getItem(`rated_${productId}`);
		if (userRated) {
			alert('Вы уже оставили оценку!');
			return;
		}

		// Сохраняем оценку в localStorage, чтобы пользователь не мог проголосовать повторно
		localStorage.setItem(`rated_${productId}`, String(i));

		setRating(i);

		// Проверяем наличие productId перед обновлением
		if (!productId) {
			console.error('Product ID отсутствует');
			return;
		}

		// Получаем текущие данные по рейтингу
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

		// Обновляем рейтинг и количество голосов в базе данных
		const { error: updateError } = await supabase
			.from('Products')
			.update({ rating: newRating, ratings_count: newRatingsCount })
			.eq('id', productId);

		if (updateError) {
			console.error('Ошибка при обновлении рейтинга:', updateError);
		}
	};

	return (
		<div {...props} onMouseLeave={() => changeDisplay(rating)}>
			{ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
		</div>
	);
};
