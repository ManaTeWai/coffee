'use client'

import styles from './AdminItem.module.css';
import Image from 'next/image';
import { Htag, P, Button } from '..';
import Link from 'next/link';
import { useState } from 'react';
import { Card } from '../../utils/products';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

type CardsProps = {
	cards: Card[];
};

const StyledTextField = styled(TextField)(({ theme }) => ({
	marginBottom: '10px',
	'& .MuiFilledInput-root': {
		'&:before': {
			borderBottomColor: 'rgba(0, 0, 0, 0.42)',
		},
		'&:after': {
			borderBottomColor: '#754B1E',
		},
	},
	'& .MuiInputLabel-root': {
		'&.Mui-focused': {
			color: '#754B1E',
		},
	},
}));

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
					cards[editingIndex] = editForm;
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
						<Button appearance='primary'>Удалить</Button>
						<Button appearance='primary' onClick={() => handleEditClick(index)}>Редактировать</Button>
					</div>
				</div>
			))}

			{editingIndex !== null && (
				<div className={styles.modal_overlay} onClick={(e) => {
					if (e.target === e.currentTarget) {
						setEditingIndex(null);
					}
				}}>
					<div className={styles.modal}>
						<div className={styles.modalContent}>
							<Htag tag='h2'>Редактировать товар</Htag>
							<StyledTextField
								fullWidth
								variant="filled"
								type="text"
								name="imageUrl"
								label="URL изображения"
								value={editForm.imageUrl}
								onChange={handleFormChange}
								placeholder="URL изображения"
							/>
							<StyledTextField
								fullWidth
								variant="filled"
								type="text"
								name="title"
								label="Название товара"
								value={editForm.title}
								onChange={handleFormChange}
								placeholder="Название товара"
							/>
							<StyledTextField
								fullWidth
								variant="filled"
								multiline
								label="Описание товара"
								name="description"
								value={editForm.description}
								onChange={handleFormChange}
								placeholder="Описание товара"
							/>
							<StyledTextField
								fullWidth
								variant="filled"
								type="number"
								name="price"
								value={editForm.price}
								onChange={handleFormChange}
								placeholder="Цена товара"
							/>
							<div className={styles.btns}>
								<Button appearance='primary' onClick={handleSaveClick}>Сохранить</Button>
								<Button appearance='primary' onClick={() => setEditingIndex(null)}>Отмена</Button>
							</div>
						</div>
					</div>
				</div>
			)
			}
		</div >
	);
}
