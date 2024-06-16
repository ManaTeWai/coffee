'use client'

import React, { useState } from 'react';
import { Htag } from '../';
import styles from './FeedbackForm.module.css';

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
			<Htag tag='h1'>FeedbackForm</Htag>
			<form onSubmit={handleSubmit}>
				<input
					className={styles.input}
					type="text"
					placeholder="Ваше имя"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className={styles.input}
					type="text"
					placeholder='Тема сообщения'
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
				/>
				<textarea
					className={styles.input}
					placeholder="Текст сообщения"
					name="MessageBody"
					id="1"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<input className={styles.submit_btn} type="submit" value="Отправить" />
			</form>
			{error && <p className={styles.error}>{error}</p>}
			{success && <p className={styles.success}>{success}</p>}
		</div>
	);
};
