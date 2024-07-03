import { Calculator, Htag, MailLink, P } from '@/components';
import styles from '@/app/page.module.css'
import Link from 'next/link';
import { Metadata } from 'next';


export const metadata: Metadata = {
	title: "Кофе Тайм || Франчайзинг",
};

export default function Franchising() {
	return (
		<div className={styles.page_wrapper}>
			<Htag className={styles.main_title} tag='h1'>Откройте свой &quot;CoffeeTime&quot; <br/>и зарабатывайте</Htag>

			<Calculator />
		</div>
	);
}