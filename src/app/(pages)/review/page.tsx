import { Htag } from '../../components';
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Кофе Тайм || Review",
	description: "Coffee to portfolio",
};

export default function Review() {
	return (
		<>
			<Htag tag="h1">Review</Htag>
		</>
	);
}