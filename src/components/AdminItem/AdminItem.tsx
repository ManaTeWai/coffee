'use client';

import styles from './AdminItem.module.css';
import Image from 'next/image';
import { Htag, P, Button } from '..';
import Link from 'next/link';
import { useState, useEffect, type JSX } from 'react';
import { supabase } from '@/utils/supabase';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { Card } from '@/utils/products';

// Компонент скелета карточки
const SkeletonCard = () => {
	return (
		<div className={styles.card}>
			<div className={styles.imagePlaceholder}></div>
			<div className={styles.text_skeleton}></div>
			<div className={styles.skeleton}></div>
		</div>
	);
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

const uploadImage = async (file: File): Promise<string> => {
	const formData = new FormData();
	formData.append('file', file);

	const response = await fetch('/api/upload', {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Ошибка загрузки изображения');
	}

	const data = await response.json();
	return data.imageUrl; // Вернуть URL загруженного изображения
};



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
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const handleEditClick = (index: number) => {
		setEditingIndex(index);
		setEditForm(cards[index]);
		setIsModalOpen(true);
	};

	const handleFormChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, files } = e.target as HTMLInputElement;

		if (name === 'imageUrl' && files && files[0]) {
			const imageUrl = await uploadImage(files[0]);
			setEditForm(prev => ({ ...prev, imageUrl }));
		} else {
			setEditForm(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
		}
	};


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
					setIsModalOpen(false);
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

	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [isModalOpen]);

	// Если загрузка идет, показываем скелеты карточек
	if (loading) {
		return (
			<div className={styles.cardContainer}>
				{Array.from({ length: 6 }).map((_, index) => (
					<SkeletonCard key={index} />
				))}
			</div>
		);
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
						setIsModalOpen(false);
					}
				}}>
					<div className={styles.modal}>
						<div className={styles.modalContent}>
							<Htag tag='h2'>Редактировать товар</Htag>
							<StyledTextField
								fullWidth
								variant="filled"
								type="file"
								name="imageUrl"
								label="Загрузить изображение"
								onChange={handleFormChange}
								InputLabelProps={{
									shrink: true,
								}}
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
									setIsModalOpen(false);
								}}>Отмена</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
