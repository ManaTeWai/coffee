import { Htag, P, Button } from '@/components';
import Image from 'next/image';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Кофе Тайм || Акции",
};

export default function Event() {
	return (
		<div className={styles.page_wrapper}>
			<Htag tag="h1">Акции и спецпредложения</Htag>
			<P size="large">Узнайте о наших выгодных предложениях и получите скидки на любимые напитки!</P>
			<div className={styles.promotions}>
				<div className={styles.promotion_card}>
					<Image width={300} height={300} src="/img/promotion1.jpg" alt="Акция 1"/>
						<Htag tag="h2">Скидка 20% на все кофе</Htag>
						<P size='medium'>Получите скидку 20% на весь ассортимент кофе. Акция действует до 31 октября.</P>
						<Button appearance="primary">Участвовать</Button>
				</div>
				<div className={styles.promotion_card}>
					<Image width={300} height={300} src="/img/promotion2.jpg" alt="Акция 2"/>
						<Htag tag='h2'>Бесплатный десерт</Htag>
						<P size='medium'>Закажите два кофе и получите десерт в подарок. Акция действует только по выходным.</P>
						<Button appearance='primary'>Участвовать</Button>
				</div>
				<div className={styles.promotion_card}>
					<Image width={300} height={300} src="/img/promotion3.jpg" alt="Акция 3"/>
						<Htag tag='h2'>Счастливые часы</Htag>
						<P size='medium'>С 14:00 до 16:00 получите скидку 30% на все напитки. Не упустите возможность!</P>
						<Button appearance='primary'>Участвовать</Button>
				</div>
			</div>
		</div>
	);
}