'use client'

import styles from './AdminItem.module.css';
import Image from 'next/image';
import { Htag, P } from '..';
import Link from 'next/link';
import { useState } from 'react';
import { Card } from '../../utils/products';

type CardsProps = {
	cards: Card[];
};

export const AdminItem = ({ cards, ...props }: CardsProps): JSX.Element => {
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editForm, setEditForm] = useState<Card>({
		imageUrl: '',
		title: '',
		description: '',
		price: 0,
	});

	const handleEditClick = (index: number) => {
		setEditingIndex(index);
		setEditForm(cards[index]);
	};

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setEditForm(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
	};

	const handleSaveClick = async () => {
		if (editingIndex !== null) {
			try {
				const res = await fetch('/api/updateCard', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ index: editingIndex, updatedCard: editForm }),
				});

				if (res.ok) {
					cards[editingIndex] = editForm; // Локальное обновление для отображения
					setEditingIndex(null);
				} else {
					console.error('Ошибка при обновлении карточки');
				}
			} catch (error) {
				if (error instanceof Error) {
					console.error('Ошибка при отправке запроса:', error.message);
				} else {
					console.error('Неизвестная ошибка при отправке запроса');
				}
			}
		}
	};

	return (
		<div className={styles.cardContainer}>
			{cards.map((card, index) => (
				<div className={styles.card} key={index}>
					<Image src={card.imageUrl} alt={card.title} width={200} height={200} className={styles.image} />
					<div className={styles.desc_cont}>
						<Link href={card.imageUrl} target='_blank'>{card.imageUrl}</Link>
						<Htag tag='h1' className={styles.title}>{card.title}</Htag>
						<P size='medium' className={styles.description}>{card.description}</P>
						<P size='large'>Цена: <span className={styles.price}>{card.price} РУБ.</span></P>
					</div>
					<div className={styles.btns}>
						<button className={styles.btn}>Удалить</button>
						<button className={styles.btn} onClick={() => handleEditClick(index)}>Редактировать</button>
					</div>
				</div>
			))}

			{editingIndex !== null && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<h2>Редактировать товар</h2>
						<input
							type="text"
							name="imageUrl"
							value={editForm.imageUrl}
							onChange={handleFormChange}
							placeholder="URL изображения"
						/>
						<input
							type="text"
							name="title"
							value={editForm.title}
							onChange={handleFormChange}
							placeholder="Название товара"
						/>
						<textarea
							name="description"
							value={editForm.description}
							onChange={handleFormChange}
							placeholder="Описание товара"
						/>
						<input
							type="number"
							name="price"
							value={editForm.price}
							onChange={handleFormChange}
							placeholder="Цена товара"
						/>
						<button onClick={handleSaveClick}>Сохранить</button>
						<button onClick={() => setEditingIndex(null)}>Отмена</button>
					</div>
				</div>
			)}
		</div>
	);
}
