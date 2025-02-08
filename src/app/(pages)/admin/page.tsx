import { Htag, AdminItem } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Кофе Тайм || Страница Администратора",
};

export default function Admin() {
	return (
		<>
			<Htag tag='h1'>Страница Администратора</Htag>

			<AdminItem/>
		</>
	);
}