'use client'

import { useState } from 'react';
import { Htag } from '../';
import styles from './FeedbackForm.module.css';

export const FeedbackForm = () => {
	const [name, setName] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [status, setStatus] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const res = await fetch('/api/sendEmail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, subject, message }),
		});

		const result = await res.json();

		if (res.status === 200) {
			setStatus('Письмо успешно отправлено');
		} else {
			setStatus('Ошибка при отправке письма');
		}
	};

	return (
		<div className={styles.container}>
			<Htag tag='h1'>Feedback Form</Htag>
			<form onSubmit={handleSubmit}>
				<input
					className={styles.input}
					type="text"
					placeholder="Ваше имя"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<input
					className={styles.input}
					type="text"
					placeholder='Тема сообщения'
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					required
				/>
				<textarea
					className={styles.input}
					placeholder="Текст сообщения"
					name="MessageBody"
					id="1"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				></textarea>
				<input className={styles.submit_btn} type="submit" value="Отправить" />
			</form>
			{status && <p>{status}</p>}
		</div>
	);
}
