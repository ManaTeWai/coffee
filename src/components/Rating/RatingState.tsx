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
	const [rating, setRating] = useState<number>(3);

	useEffect(() => {
		const fetchRating = async () => {
			const { data, error } = await supabase
				.from('Products')
				.select('rating')
				.eq('id', productId);

			if (error) {
				console.error('Ошибка загрузки рейтинга:', error);
			} else if (data) {
				setRating(data[0].rating);
			}
		};

		fetchRating();
	}, [productId]);

	return (
		<Rating rating={rating} isEditable setRating={setRating} productId={productId} />
	);
};