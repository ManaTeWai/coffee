'use client'

import React, { useState } from 'react';
import { Htag } from '../';
import styles from './FeedbackForm.module.css';
import TextField from '@mui/material/TextField';
import useStyles from '@/utils/TextStyles';

export const FeedbackForm = (): JSX.Element => {
	const [name, setName] = useState('');
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
				body: JSON.stringify({ name, subject, message }),
			});

			if (res.ok) {
				const data = await res.json();
				setSuccess(data.message);
				setError('');
				setName('');
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

	const classes = useStyles();

	return (
		<div className={styles.container}>
			<Htag tag='h1'>Форма обратной связи</Htag>
			<form onSubmit={handleSubmit}>
				<TextField
					id='1'
					fullWidth
					label="Ваше Имя"
					variant="filled"
					className={classes.root}
					type="text"
					autoComplete='on'
					name='name'
					placeholder="Ваше имя"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					id='2'
					fullWidth
					label="Тема сообщения"
					variant="filled"
					className={classes.root}
					type="text"
					name='subject'
					autoComplete='off'
					placeholder='Тема сообщения'
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
				/>
				<TextField
					id='3'
					fullWidth
					label="Текст сообщения"
					multiline
					variant="filled"
					className={classes.root}
					placeholder="Текст сообщения"
					name="MessageBody"
					rows={5}
					autoComplete='off'
					
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className={styles.submit_btn} type="submit" value="Отправить">Отправить</button>
			</form>
			{error && <p className={styles.error}>{error}</p>}
			{success && <p className={styles.success}>{success}</p>}
		</div>
	);
};
