import { Htag } from '../../components';
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Кофе Тайм || Delivery",
	description: "Coffee to portfolio",
};

export default function Delivery() {
	return (
		<>
			<Htag tag="h1">Delivery</Htag>
		</>
	);
}