import { Htag, FeedbackForm, P } from '@/components';
import styles from '@/app/page.module.css'
import Link from 'next/link';

export default function Contacts() {
	return (
		<div className={styles.page_wrapper}>
			<Htag tag='h1'>Контакты</Htag>
			<ul>
				<li><P>Номер телефона: <Link href="tel:89885271618">8 988 527 16 18</Link></P></li>
				<li><P>Почта: <Link href="mailto:maksimts03@gmail.com">maksimts03@gmail.com</Link></P></li>
			</ul>
			<FeedbackForm />
		</div>
	);
}