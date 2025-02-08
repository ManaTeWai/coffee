import { Htag, P, ReviewItem } from '@/components';
import type { Metadata } from "next";
import styles from '@/app/page.module.css';

export const metadata: Metadata = {
	title: "Кофе Тайм || Отзывы",
	description: "Отзывы CoffeeTime",
};

export default function Review() {
	return (
		<div className={styles.page_wrapper}>
			<Htag tag="h1">Напишите свой отзыв</Htag>
			<ReviewItem />
		</div>
	);
}