import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import styles from './page.module.css';
import { Htag, P, RatingState } from '@/components';
import { createClient } from '@supabase/supabase-js';


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

    return products.map((product) => ({
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
            </div>
            <div className={styles.some_desc}>
                <P size="medium">{product.some_desc}</P>
            </div>
        </div>
    );
}