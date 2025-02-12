import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import styles from './page.module.css';
import { Htag, P, RatingState } from '@/components';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function generateMetadata(
    props: {
        params: Promise<{ id: string }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    const productId = parseInt(params.id, 10);

    const { data: product } = await supabase
        .from('Products')
        .select('*')
        .eq('id', productId)
        .single();

    return {
        title: `Кофе Тайм || ${product?.title || 'Продукт не найден'}`,
        description: `Описание для ${product?.title || 'этого продукта'}`,
    };
}

export const revalidate = 60;

export async function generateStaticParams() {
    const { data: products, error } = await supabase.from('Products').select('id');

    if (error || !products) {
        console.error('Ошибка загрузки продуктов или данные отсутствуют:', error);
        return [];
    }
    return products?.map((product: { id: number }) => ({
        id: product.id.toString(),
    }));
}

export default async function ProductPage(
    props: {
        params: Promise<{ id: string }>;
    }
) {
    const params = await props.params;
    const productId = parseInt(params.id, 10);

    // Загружаем текущий продукт
    const { data: product, error: productError } = await supabase
        .from('Products')
        .select('*')
        .eq('id', productId)
        .single();

    if (productError || !product) {
        console.error('Ошибка загрузки продукта:', productError);
        notFound();
    }

    // Загружаем 4 случайных продукта, исключая текущий
    const { data: recommendations, error: recommendationsError } = await supabase
        .from('Products')
        .select('id, title, imageUrl, price, description')
        .not('id', 'eq', productId)
        .limit(4);

    if (recommendationsError) {
        console.error('Ошибка загрузки рекомендаций:', recommendationsError);
    }

    return (
        <div className={styles.page_wrapper}>
            <div className={styles.main_content}>
                <div className={styles.title}>
                    <Htag tag="h1" className={styles.titleHeader}>
                        {product.title}
                    </Htag>
                    <Image
                        src={product.imageUrl}
                        alt={product.title}
                        width={250}
                        height={250}
                    />
                </div>
                <div className={styles.description}>
                    <RatingState productId={product.id} />
                    <P size="medium">{product.description}</P>
                    <P size="large">
                        Цена: <span className={styles.price}>{product.price} РУБ.</span>
                    </P>
                </div>
                <div className={styles.some_desc}>
                    <P size="medium">{product.some_desc}</P>
                </div>
            </div>

            {recommendations && recommendations.length > 0 && (
                <div className={styles.recommendations}>
                    <Htag tag="h2">Так же советуем попробовать</Htag>
                    
                    <div className={styles.recommendations_grid}>
                        {recommendations.map((rec) => (
                            <Link href={`/product/${rec.id}`} key={rec.id} className={styles.link}>
                                <div key={rec.id} className={styles.recommendation_card}>
                                    <Image
                                        className={styles.image}
                                        src={rec.imageUrl}
                                        alt={rec.title}
                                        width={150}
                                        height={150}
                                    />
                                    <Htag tag='h1' className={styles.title}>{rec.title}</Htag>
                                    <P size="medium" className={styles.description}>{rec.description}</P>
                                    <P size="large">
                                        Цена: <span className={styles.price}>{rec.price} РУБ.</span>
                                    </P>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
