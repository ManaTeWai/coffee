import { Calculator, Htag } from '@/components';
import styles from '@/app/page.module.css'
import { Metadata } from 'next';
import Image from 'next/image';


export const metadata: Metadata = {
	title: "Кофе Тайм || Франчайзинг",
};

export default function Franchising() {
	return (
		<div className={styles.page_wrapper}>
			<Htag className={styles.main_title} tag='h1'>Откройте свой &quot;CoffeeTime&quot; <br />и зарабатывайте</Htag>

			<div className={styles.calculator_cont}>
				<Calculator />
				<div className={styles.image_cont}>
					<Image width={300} height={500} alt='Фото' src='/img/banner-img.jpeg' className={styles.banner} />
				</div>
			</div>
		</div>
	);
}