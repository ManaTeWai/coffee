import styles from './Footer.module.css';
import { FooterProps } from './Footer.Props';
import Link from 'next/link';
import { format } from 'date-fns'
import Image from 'next/image';
import { P } from '../'

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<>
			<div className={styles.sale}>
				<div className={styles.sale__unit}>
					<P size='medium'>Получите скидку 20% на первый заказ</P>
					<div className={styles.sale__unit__form}>
						<div className={styles.sale__unit__form__up}>
							<input type="text" name="" id="" placeholder="Имя" />
							<input type="text" name="" id="" placeholder="Телефон" />
						</div>
						<div className={styles.sale__unit__form__down}>
							<input type="button" value="Получить" />
						</div>
					</div>
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.footerLogo}>
					<P size='medium' className={styles.logo}>КофеТайм</P>
				</div>
				<div className={styles.footer_menu}>
					<ul className={styles.menu}>
						<li className={styles.li}><P size='medium' className={styles.menu_header}>КофеТайм</P></li>
						<li className={styles.li}><Link className={styles.link} href="/about">О нас</Link></li>
						<li className={styles.li}><Link className={styles.link} href="/career">Карьера</Link></li>
						<li className={styles.li}><Link className={styles.link} href="/business">Для бизнеса</Link></li>
						<li className={styles.li}><Link className={styles.link} href="/franchising">Франчайзинг</Link></li>
					</ul>
					<ul className={styles.menu}>
						<li className={styles.li}><P size="medium" className={styles.menu_header}>Клиентам</P></li>
						<li className={styles.li}><Link className={styles.link} href="/event">Акции</Link></li>
						<li className={styles.li}><Link className={styles.link} href="/bonuses">Бонусы</Link></li>
						<li className={styles.li}><Link className={styles.link} href="/price_list">Прейскурант</Link></li>
					</ul>
					<ul className={styles.menu}>
						<li className={styles.li}><P size="medium" className={styles.menu_header}>Помощь</P></li>
						<li className={styles.li}><Link className={styles.link} href="/zones_and_deliver">Зоны и условия доставки</Link></li>
						<li className={styles.li}><Link className={styles.link} href="/restaurants">Рестораны</Link></li>
						<li className={styles.li}><Link className={styles.link} href="/contacts">Контакты</Link></li>
					</ul>

					<div>
						<P size="medium" className={styles.menu_header}>Мы в социальных сетях</P>
						<div className={styles.social}>
							<Link href="https://vk.com/manatewai"><Image src="/img/vk.png" alt="вк" width={60} height={60} /></Link>
							<Link href="https://wa.me/89885271618"><Image src="/img/whatsapp.png" alt="вотсап" width={40} height={40} /></Link>
							<Link href="https://t.me/manatewai"><Image src="/img/tg.png" alt="телеграм" width={50} height={50} /></Link>
						</div>
					</div>
				</div>
				<div className={styles.copyright}>
					<P size="medium">© 2022 - {format(new Date(), 'yyyy')} КофеТайм. Все права защищены.</P>
					<Link className={styles.copy_link} href="/policy">Политика конфиденциальности</Link>
				</div>
			</div>
		</>
	);
}