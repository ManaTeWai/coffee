import { Htag, P, ReviewItem } from '@/components';
import type { Metadata } from "next";
import styles from '@/app/page.module.css';

export const metadata: Metadata = {
	title: "Кофе Тайм || Review",
	description: "Coffee to portfolio",
};

export default function Review() {
	return (
		<div className={styles.page_wrapper}>
			<Htag tag="h1">Review</Htag>
			<ReviewItem />
		</div>
	);
}