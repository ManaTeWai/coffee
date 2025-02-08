import { Htag, P } from '@/components';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Кофе Тайм || Рестораны",
};

export default function Restaurants() {
	return (
		<>
			<Htag tag="h1">Наши рестораны</Htag>
			<P size="large">Посетите наши рестораны и наслаждайтесь вкуснейшими блюдами и напитками.</P>

			<div className={styles.restaurants}>
				<div className={styles.restaurantCard}>
					<Htag tag="h2">Ресторан "Кофе Тайм" (Центр)</Htag>
					<P size="medium">Адрес: ул. Центральная, 1</P>
					<P size="medium">Телефон: +7 (123) 456-78-90</P>
					<P size="medium">Часы работы: 10:00 - 22:00</P>
				</div>
				<div className={styles.restaurantCard}>
					<Htag tag="h2">Ресторан "Кофе Тайм" (Северный)</Htag>
					<P size="medium">Адрес: ул. Северная, 10</P>
					<P size="medium">Телефон: +7 (123) 456-78-91</P>
					<P size="medium">Часы работы: 10:00 - 22:00</P>
				</div>
				<div className={styles.restaurantCard}>
					<Htag tag="h2">Ресторан "Кофе Тайм" (Южный)</Htag>
					<P size="medium">Адрес: ул. Южная, 20</P>
					<P size="medium">Телефон: +7 (123) 456-78-92</P>
					<P size="medium">Часы работы: 10:00 - 22:00</P>
				</div>
			</div>

			<div className={styles.map}>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.373789929813!2d37.61763331593067!3d55.75582628055315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5a738fa419%3A0x7c347d50b7e9b1f5!2sRed%20Square!5e0!3m2!1sen!2sru!4v1632912345678!5m2!1sen!2sru"
					width="100%"
					height="450"
					style={{ border: 0 }}
					allowFullScreen
					loading="lazy"
				/>
			</div>
		</>
	);
}