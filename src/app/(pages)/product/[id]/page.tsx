import { notFound } from 'next/navigation';
import { cards } from '@/utils/products';
import Image from 'next/image';
import { Metadata } from 'next';
import styles from './page.module.css';
import { Htag, P } from '@/components';

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
	const productId = parseInt(params.id, 10);

	if (isNaN(productId) || productId < 0 || productId >= cards.length) {
		return {
			title: 'Товар не найден',
		};
	}

	const product = cards[productId];

	return {
		title: product.title,
		description: product.description,
	};
}

type ProductPageProps = {
	params: {
		id: string;
	};
};

export default function ProductPage({ params }: ProductPageProps) {
	const productId = parseInt(params.id, 10);

	if (isNaN(productId) || productId < 0 || productId >= cards.length) {
		notFound();
	}

	const product = cards[productId];

	return (
		<div className={styles.page_wrapper}>
			<div className={styles.main_content}>
				<div className={styles.title}>
					<Htag tag='h1'>{product.title}</Htag>
					<Image src={product.imageUrl} alt={product.title} width={250} height={250} />
				</div>
				<div className={styles.description}>
					<P size='medium'>{product.description}</P>
					<P size='large'>Цена: <span className={styles.price}>{product.price} РУБ.</span></P>
				</div>
			</div>
			<div className={styles.some_desc}>

			</div>
		</div>
	);
}
