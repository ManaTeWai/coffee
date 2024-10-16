'use client';

import styles from './AdminItem.module.css';
import Image from 'next/image';
import { Htag, P, Button } from '..';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Card } from '@/utils/products'

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

export const AdminItem = (): JSX.Element => {
	const [cards, setCards] = useState<Card[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [editForm, setEditForm] = useState<Card>({
		id: 0,
		imageUrl: '',
		title: '',
		description: '',
		price: 0,
	});
	const [isModalOpen, setIsModalOpen] = useState(false); // Новое состояние для отслеживания модального окна

	// Загрузка карточек из Supabase
	useEffect(() => {
		const fetchCards = async () => {
			try {
				const { data, error } = await supabase
					.from('Products')
					.select('*')
					.order('id', { ascending: true });

				if (error) {
					console.error('Ошибка загрузки данных:', error);
				} else {
					setCards(data || []);
				}
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCards();
	}, []);

	// Обработка нажатия на кнопку "Редактировать"
	const handleEditClick = (index: number) => {
		setEditingIndex(index);
		setEditForm(cards[index]);
		setIsModalOpen(true); // Открываем модальное окно
	};

	// Обновление формы редактирования
	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setEditForm(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
	};

	// Обработка нажатия на кнопку "Сохранить"
	const handleSaveClick = async () => {
		if (editingIndex !== null) {
			try {
				const updatedCard = { ...editForm };

				const { error } = await supabase
					.from('Products')
					.update(updatedCard)
					.eq('id', updatedCard.id);

				if (error) {
					console.error('Ошибка при обновлении карточки:', error);
				} else {
					const updatedCards = [...cards];
					updatedCards[editingIndex] = updatedCard;
					setCards(updatedCards);
					setEditingIndex(null);
					setIsModalOpen(false); // Закрываем модальное окно
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

	// Обработка нажатия на кнопку "Удалить"
	const handleDeleteClick = async (id: number) => {
		try {
			const { error } = await supabase
				.from('Products')
				.delete()
				.eq('id', id);

			if (error) {
				console.error('Ошибка при удалении карточки:', error);
			} else {
				setCards(cards.filter(card => card.id !== id));
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error('Ошибка при отправке запроса:', error.message);
			} else {
				console.error('Неизвестная ошибка при отправке запроса');
			}
		}
	};

	// Отключение скролла при открытии модального окна
	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = 'hidden'; // Отключаем скролл
		} else {
			document.body.style.overflow = ''; // Включаем скролл обратно
		}
	}, [isModalOpen]);

	if (loading) {
		return <div>Загрузка...</div>;
	}

	return (
		<div className={styles.cardContainer}>
			{cards.map((card, index) => (
				<div className={styles.card} key={card.id}>
					<Link href={`/product/${card.id}`}>
						<Image src={card.imageUrl} alt={card.title} width={200} height={200} className={styles.image} />
					</Link>
					<div className={styles.desc_cont}>
						<Link href={card.imageUrl} target='_blank'>{card.imageUrl}</Link>
						<Htag tag='h1' className={styles.title}>{card.title}</Htag>
						<P size='medium' className={styles.description}>{card.description}</P>
						<P size='large'>Цена: <span className={styles.price}>{card.price} РУБ.</span></P>
					</div>
					<div className={styles.btns}>
						<Button appearance='primary' onClick={() => handleEditClick(index)}>Редактировать</Button>
						<Button appearance='primary' onClick={() => handleDeleteClick(card.id)}>Удалить</Button>
					</div>
				</div>
			))}

			{editingIndex !== null && (
				<div className={styles.modal_overlay} onClick={(e) => {
					if (e.target === e.currentTarget) {
						setEditingIndex(null);
						setIsModalOpen(false); // Закрываем модальное окно
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
								<Button appearance='primary' onClick={() => {
									setEditingIndex(null);
									setIsModalOpen(false); // Закрываем модальное окно
								}}>Отмена</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div >
	);
};
