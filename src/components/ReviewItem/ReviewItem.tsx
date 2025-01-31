'use client';

import React, { useState, type JSX } from 'react';
import { Htag, Button, P } from '..';
import styles from './ReviewItem.module.css';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

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

export const ReviewItem = (): JSX.Element => {
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch('/api/sendEmail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, phoneNumber, subject, message }),
			});

			if (res.ok) {
				const data = await res.json();
				setSuccess(data.message);
				setError('');
				setName('');
				setPhoneNumber('');
				setSubject('');
				setMessage('');
			} else {
				const errorData = await res.json();
				setError(errorData.error);
				setSuccess('');
			}
		} catch (error) {
			setError('Ошибка при отправке письма');
			setSuccess('');
		}
	};

	return (
		<div className={styles.container}>
			<Htag tag='h1'>Форма обратной связи</Htag>
			<form onSubmit={handleSubmit}>
				<StyledTextField
					id='1'
					fullWidth
					label="Ваше имя"
					variant="filled"
					type="text"
					autoComplete='name'
					name='name'
					placeholder="Ваше имя"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<StyledTextField
					id='2'
					fullWidth
					label="Номер телефона"
					variant="filled"
					type="text"
					name="phoneNumber"
					autoComplete="tel"
					value={phoneNumber}
					placeholder="8 (___) ___-__-__"
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
				<StyledTextField
					id='3'
					fullWidth
					label="Тема сообщения"
					variant="filled"
					type="text"
					name='subject'
					autoComplete='off'
					placeholder='Тема сообщения'
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
				/>
				<StyledTextField
					id='4'
					fullWidth
					label="Текст сообщения"
					multiline
					variant="filled"
					placeholder="Текст сообщения"
					name="MessageBody"
					rows={5}
					autoComplete='off'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Button appearance='primary' type="submit" value="Отправить">Отправить</Button>
			</form>
			{error && <P size='medium' className={styles.error}>{error}</P>}
			{success && <P size='medium' className={styles.success}>{success}</P>}
		</div>
	);
};
