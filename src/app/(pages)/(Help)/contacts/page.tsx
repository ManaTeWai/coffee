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
			<Htag tag='h1'>Адрес</Htag>
			<div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
				<a href="https://yandex.ru/maps/36/stavropol/?utm_medium=mapframe&utm_source=maps" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>Ставрополь</a>
				<a href="https://yandex.ru/maps/36/stavropol/house/ulitsa_lenina_326_38/YEgYfwJhTEICQFpvfXxydn9gZA==/?ll=41.951575%2C45.037330&utm_medium=mapframe&utm_source=maps&z=17.14" style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}>Улица Ленина, 326/38 — Яндекс Карты</a>
				<iframe src="https://yandex.ru/map-widget/v1/?ll=41.951575%2C45.037330&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzUzODI4ORJD0KDQvtGB0YHQuNGPLCDQodGC0LDQstGA0L7Qv9C-0LvRjCwg0YPQu9C40YbQsCDQm9C10L3QuNC90LAsIDMyNi8zOCIKDWrOJ0IVOiY0Qg%2C%2C&z=17.14" width="100%" height="500" frameBorder='1' allowFullScreen={true} style={{ position: 'relative', margin: 'auto' }}></iframe>
			</div>
		</div>
	);
}