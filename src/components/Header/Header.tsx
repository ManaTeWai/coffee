'use client'

import styles from './Header.module.css';
import { useState, useRef, useEffect } from 'react';
import { HeaderProps } from './Header.Props';
import Link from 'next/link';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [isOpen]);

	return (
		<div className={styles.header}>
			<div className={styles.menu}>
				<ul className={styles.nav}>
					<li className={styles.li}><Link href="/about">О нас</Link></li>
					<li className={styles.li}><Link href="/review">Отзывы</Link></li>
					<li className={styles.li}><Link href="/" className={styles.logo}>КофеТайм</Link></li>
					<li className={styles.li}><Link href="/ceeds">Зерна</Link></li>
					<li className={styles.li}><Link href="/delivery">Доставка</Link></li>
				</ul>
			</div>
			<div className={styles.mobile_menu_cont} ref={menuRef}>
				<Link href="/" className={styles.logo}>КофеТайм</Link>
				<div className={styles.mobile_menu}>
					<div className={`${styles.burger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
						<div></div>
						<div></div>
						<div></div>
					</div>
					<ul className={`${styles.mobile_nav} ${isOpen ? styles.open : ''}`}>
						<li className={styles.mobile_li} onClick={toggleMenu}><Link href="/about">О нас</Link></li>
						<li className={styles.mobile_li} onClick={toggleMenu}><Link href="/review">Отзывы</Link></li>
						<li className={styles.mobile_li} onClick={toggleMenu}><Link href="/ceeds">Зерна</Link></li>
						<li className={styles.mobile_li} onClick={toggleMenu}><Link href="/delivery">Доставка</Link></li>
					</ul>
				</div>
			</div>
		</div>
	);
}