'use client';

import { Htag, P } from '@/components';
import styles from './PriceList.module.css';
import { useEffect, useState, type JSX } from 'react';
import { supabase } from '@/utils/supabase';

export const Pricelist = (): JSX.Element => {
	const [categories, setCategories] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				// Запрос данных из таблицы Products
				const { data, error } = await supabase
					.from('Products')
					.select('*')
					.order('id', { ascending: true });

				if (error) {
					console.error('Ошибка загрузки данных:', error);
				} else {
					// Группируем продукты по категориям
					const groupedData = data.reduce((acc, product) => {
						if (!acc[product.category]) {
							acc[product.category] = [];
						}
						acc[product.category].push(product);
						return acc;
					}, {});

					setCategories(Object.entries(groupedData));
				}
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return (
		<div>
			<Htag tag="h1">Прейскурант</Htag>
			<P size="large">Выберите напиток или десерт из нашего меню и наслаждайтесь вкусом!</P>

			{categories.map(([category, products]) => (
				<div key={category} className={styles.category}>
					<Htag tag="h2">{category}</Htag>
					<table>
						<thead>
							<tr>
								<th>Название</th>
								<th>Описание</th>
								<th>Цена</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product: any) => (
								<tr key={product.id}>
									<td>{product.title}</td>
									<td>{product.description}</td>
									<td>{product.price} ₽</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
};