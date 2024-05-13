import styles from './Header.module.css';
import { HeaderProps } from './Header.Props';
import Link from 'next/link';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	return (
		<div className={styles.banner1}>
			<div className={styles.banner1_img}>
				<ul className={styles.nav}>
					<li className={styles.li}><Link href="/about">О нас</Link></li>
					<li className={styles.li}><Link href="/review">Отзывы</Link></li>
					<li className={styles.li}><Link href="/" className={styles.logo}>КофеТайм</Link></li>
					<li className={styles.li}><Link href="/ceeds">Зерна</Link></li>
					<li className={styles.li}><Link href="/delivery">Доставка</Link></li>
				</ul>
			</div>
		</div>
	);
}