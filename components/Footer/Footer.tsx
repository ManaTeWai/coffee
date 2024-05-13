import styles from './Footer.module.css';
import { FooterProps } from './Footer.Props';
import Link from 'next/link';
import { format } from 'date-fns'
import Image from 'next/image';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<div className={styles.footer}>
			<div className={styles.footerLogo}>
				<p className={styles.logo}>КофеТайм</p>
			</div>
			<div className={styles.footer_menu}>
				<ul className={styles.menu}>
					<li className={styles.li}><p className={styles.menu_header}>КофеТайм</p></li>
					<li className={styles.li}><Link className={styles.link} href="/about">О нас</Link></li>
					<li className={styles.li}><Link className={styles.link} href="/career">Карьера</Link></li>
					<li className={styles.li}><Link className={styles.link} href="/business">Для бизнеса</Link></li>
					<li className={styles.li}><Link className={styles.link} href="/franchising">Франчайзинг</Link></li>
				</ul>
				<ul className={styles.menu}>
					<li className={styles.li}><p className={styles.menu_header}>Клиентам</p></li>
					<li className={styles.li}><Link className={styles.link} href="/event">Акции</Link></li>
					<li className={styles.li}><Link className={styles.link} href="/bonuses">Бонусы</Link></li>
					<li className={styles.li}><Link className={styles.link} href="/price_list">Прейскурант</Link></li>
				</ul>
				<ul className={styles.menu}>
					<li className={styles.li}><p className={styles.menu_header}>Помощь</p></li>
					<li className={styles.li}><Link className={styles.link} href="/zones_and_deliver">Зоны и условия доставки</Link></li>
					<li className={styles.li}><Link className={styles.link} href="/restaurants">Рестораны</Link></li>
					<li className={styles.li}><Link className={styles.link} href="/contacts">Контакты</Link></li>
				</ul>

				<div>
					<p className={styles.menu_header}>Мы в социальных сетях</p>
					<div className={styles.social}>
						<Link href="https://vk.com/manatewai"><Image src="/img/vk.png" alt="вк" width={60} height={60} /></Link>
						<Link href="https://wa.me/89885271618"><Image src="/img/whatsapp.png" alt="вотсап" width={40} height={40} /></Link>
						<Link href="https://t.me/manatewai"><Image src="/img/tg.png" alt="телеграм" width={50} height={50} /></Link>
					</div>
				</div>
			</div>
			<div className={styles.copyright}>
				<p>© 2022 - {format(new Date(), 'yyyy')} КофеТайм. Все права защищены.</p>
				<Link className={styles.copy_link} href="/policy">Политика конфиденциальности</Link>
			</div>
		</div>
	);
}