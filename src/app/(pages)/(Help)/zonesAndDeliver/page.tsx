import { Htag, P, Button } from '@/components';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Кофе Тайм || Зоны и условия доставки",
};

export default function ZonesAndDeliver() {
	return (
		<div>
			<Htag tag="h1">Зоны и условия доставки</Htag>
			<P size="large">Узнайте о наших зонах доставки, стоимости и времени доставки.</P>

			<div className={styles.deliveryInfo}>
				<Htag tag="h2">Зоны доставки</Htag>
				<table>
					<thead>
						<tr>
							<th>Зона</th>
							<th>Районы</th>
							<th>Стоимость доставки</th>
							<th>Время доставки</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Зона 1</td>
							<td>Центр города</td>
							<td>Бесплатно</td>
							<td>30-45 минут</td>
						</tr>
						<tr>
							<td>Зона 2</td>
							<td>Спальные районы</td>
							<td>200 ₽</td>
							<td>45-60 минут</td>
						</tr>
						<tr>
							<td>Зона 3</td>
							<td>Пригород</td>
							<td>400 ₽</td>
							<td>60-90 минут</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className={styles.conditions}>
				<Htag tag="h2">Условия доставки</Htag>
				<ul className={styles.list}>
					<li>
						<P size="medium">Минимальная сумма заказа для доставки — 500 ₽.</P>
					</li>
					<li>
						<P size="medium">Доставка осуществляется с 10:00 до 22:00.</P>
					</li>
					<li>
						<P size="medium">Оплата возможна наличными или картой курьеру.</P>
					</li>
					<li>
						<P size="medium">При отмене заказа менее чем за 30 минут до доставки взимается штраф 200 ₽.</P>
					</li>
				</ul>
			</div>

			<div className={styles.orderButton}>
				<Button appearance="primary">
					Оформить заказ
				</Button>
			</div>
		</div>
	)
}