'use client'

import { Htag } from '@/components';
import { useState } from 'react';


export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			if (!response.ok) {
				throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
			}

			const data = await response.json();
			// Дальнейшая обработка данных...
		} catch (error) {
			console.error('Ошибка запроса:', error);
		}

	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="username"
				placeholder="Имя пользователя"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
			<input
				type="password"
				name="password"
				placeholder="Пароль"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Войти</button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</form>
	);
};