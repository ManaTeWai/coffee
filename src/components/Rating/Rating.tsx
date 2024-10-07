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

export const Rating = ({ isEditable = false, rating, setRating, productId, ...props }: RatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

	useEffect(() => {
		constructRating(rating);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rating]);

	const constructRating = (CurrentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<StarIcon
					key={i} // Добавил ключ для каждой иконки
					className={cn(styles.Star, {
						[styles.filled]: i < CurrentRating,
						[styles.editable]: isEditable
					})}
					onMouseEnter={() => changeDisplay(i + 1)}
					onClick={() => HandleClick(i + 1)}
				/>
			);
		});
		setRatingArray(updatedArray);
	};

	const changeDisplay = (i: number) => {
		if (!isEditable) {
			return;
		}
		constructRating(i);
	};

	const HandleClick = async (i: number) => {
		if (!isEditable || !setRating) {
			return;
		}
		setRating(i);

		// Проверяем наличие productId перед обновлением
		if (!productId) {
			console.error('Product ID отсутствует');
			return;
		}

		const { error } = await supabase
			.from('Products')
			.update({ rating: i })
			.eq('id', productId);

		if (error) {
			console.error('Ошибка при обновлении рейтинга:', error);
		}
	};

	return (
		<div {...props} onMouseLeave={() => changeDisplay(rating)}>
			{ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
		</div>
	);
};
