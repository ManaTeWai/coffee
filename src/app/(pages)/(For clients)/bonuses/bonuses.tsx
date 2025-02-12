'use client';

import { Htag, Button, P } from '@/components';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './page.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Bonuses() {
	const [bonusBalance, setBonusBalance] = useState(0);
	const [bonusHistory, setBonusHistory] = useState<{ date: string; amount: number; source: string }[]>([]); // История начислений
	const [chartData, setChartData] = useState<ChartData<'bar'>>({
		labels: [],
		datasets: [],
	});


	useEffect(() => {
		const fetchBonusData = async () => {
			// Имитация запроса к API
			const response = await fetch('/api/bonus');
			const data = await response.json();

			setBonusBalance(data.balance);
			setBonusHistory(data.history);

			// Подготовка данных для графика
			const labels = data.history?.map((entry: { date: string }) => entry.date) || [];
			const amounts = data.history?.map((entry: { amount: number }) => entry.amount) || [];

			setChartData({
				labels,
				datasets: [
					{
						label: 'Начислено бонусов',
						data: amounts,
						backgroundColor: 'rgba(166, 124, 82, 0.2)',
						borderColor: 'rgba(166, 124, 82, 1)',
						borderWidth: 1,
					},
				],
			});
		};

		fetchBonusData();
	}, []);

	const handleUseBonus = () => {
		alert('Бонусы успешно применены к заказу!');
	};

	return (
		<div className={styles.page_wrapper}>
			<Htag tag="h1">Мои бонусы</Htag>

			{/* Текущий баланс */}
			<div className={styles.balance}>
				<P size="large">Текущий баланс: <span className={styles.balanceValue}>{bonusBalance} бонусов</span></P>
			</div>

			{/* График начислений */}
			<div className={styles.chart}>
				<Htag tag="h2">График начислений</Htag>
				<Bar
					data={chartData}
					options={{
						responsive: true,
						plugins: {
							legend: {
								position: 'top',
							},
							title: {
								display: true,
								text: 'Начисления бонусов за последние месяцы',
							},
						},
					}}
				/>
			</div>

			{/* История начислений */}
			<div className={styles.history}>
				<Htag tag="h2">История начислений</Htag>
				<table>
					<thead>
						<tr>
							<th>Дата</th>
							<th>Сумма</th>
							<th>Источник</th>
						</tr>
					</thead>
					<tbody>
						{bonusHistory.map((entry: { date: string; amount: number; source: string }, index: number) => (
							<tr key={index}>
								<td>{entry.date}</td>
								<td>{entry.amount} бонусов</td>
								<td>{entry.source}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className={styles.button_cont}>
				<Button appearance='primary' onClick={handleUseBonus}>
					Использовать бонусы
				</Button>
			</div>
		</div>
	);
}