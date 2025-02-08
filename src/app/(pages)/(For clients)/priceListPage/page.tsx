import { Pricelist } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Кофе Тайм || Прейскурант",
};

export default function PriceListPage() {
	return (
		<>
			<Pricelist />
		</>
	);
}