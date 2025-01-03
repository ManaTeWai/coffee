import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import styles from './page.module.css';
import { Htag, P, RatingState } from '@/components';
import { createClient } from '@supabase/supabase-js';

// Создайте клиент Supabase
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

type ProductPageProps = {
	params: {
		id: string;
	};
};

// Функция для генерации метаданных
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
	const productId = parseInt(params.id, 10);

	const { data: product, error } = await supabase
		.from('Products')
		.select('*')
		.eq('id', productId)
		.single();

	return {
		title: `Кофе Тайм || ${product?.title || 'Продукт не найден'}`,
		description: `Описание для ${product?.title || 'этого продукта'}`,
	};
}

// Основной экспорт страницы
export default async function ProductPage({ params }: ProductPageProps) {
	const productId = parseInt(params.id, 10);

	const { data: product, error } = await supabase
		.from('Products')
		.select('*')
		.eq('id', productId)
		.single();

	if (error || !product) {
		notFound();
	}

	return (
		<div className={styles.page_wrapper}>
			<div className={styles.main_content}>
				<div className={styles.title}>
					<Htag tag='h1' className={styles.titleHeader}>{product.title}</Htag>
					<Image src={product.imageUrl} alt={product.title} width={250} height={250} />
				</div>
				<div className={styles.description}>
					<P size='medium'>{product.description}</P>
					<P size='large'>Цена: <span className={styles.price}>{product.price} РУБ.</span></P>
					<RatingState productId={productId} />
				</div>
			</div>
			<div className={styles.some_desc}>
				<P size='medium'>{product.some_desc}</P>
			</div>
		</div>
	);
}
