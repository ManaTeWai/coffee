import { FeedbackForm, Htag, P, ReviewItem } from '@/components';
import type { Metadata } from "next";
import styles from '@/app/page.module.css';

export const metadata: Metadata = {
	title: "Кофе Тайм || Отзывы",
	description: "Отзывы CoffeeTime",
};

const reviews = [
	{
		ImageType: '/img/man.jpg',
		author: 'Максим',
		text: 'Отличное заведение. Всегда покупаю здесь кофе и вожу сюда девушек на свидания',
	},
	{
		ImageType: '/img/woman.jpg',
		author: 'Юля',
		text: 'Отличное заведение. Всегда покупаю здесь кофе и вожу сюда парней на свидания',
	},
];

export default function Review() {
	return (
		<div className={styles.page_wrapper}>
			<Htag tag="h1">Напишите свой отзыв</Htag>
			<FeedbackForm source="Отзыв" />

			<Htag tag="h1">Отзывы</Htag>
			<P size="large">Посмотрите отзывы наших клиентов</P>
			<ReviewItem reviews={reviews}/>
		</div>
	);
}