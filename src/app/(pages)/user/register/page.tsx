'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { Button, Htag, P } from '@/components';
import { styled } from '@mui/system';
import styles from './page.module.css';

const StyledTextField = styled(TextField)(({ theme }) => ({
	marginBottom: '10px',
	'& .MuiFilledInput-root': {
		'&:before': {
			borderBottomColor: 'rgba(166, 124, 82, 0.42)',
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

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	const handleRegister = async () => {
		try {
			// Регистрация пользователя через Supabase Auth
			const { data: authData, error: authError } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						username, // Дополнительные данные пользователя
					},
				},
			});

			if (authError) {
				setErrorMessage(authError.message);
				return;
			}

			// Добавление пользователя в таблицу `users`
			const { data: userData, error: userError } = await supabase
				.from('users')
				.insert([
					{
						id: authData.user?.id, // ID из auth.users
						email,
						username,
						bonus_points: 0, // Начальное количество бонусов
					},
				]);

			if (userError) {
				setErrorMessage(userError.message);
				return;
			}

			router.push('/user/login');
		} catch (error) {
			console.error('Ошибка при регистрации:', error);
			setErrorMessage('Произошла ошибка. Пожалуйста, попробуйте снова.');
		}
	};

	return (
		<div className={styles.page_wrapper}>
			<div className={styles.container}>
				<Htag tag='h1'>Регистрация</Htag>
				<StyledTextField
					label="Email"
					variant="filled"
					fullWidth
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<StyledTextField
					label="Имя пользователя"
					variant="filled"
					fullWidth
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<StyledTextField
					label="Пароль"
					variant="filled"
					fullWidth
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{errorMessage && <P size="medium" style={{ color: 'red' }}>{errorMessage}</P>}
				<Button onClick={handleRegister} appearance="primary">
					Зарегистрироваться
				</Button>
				<P size="medium" style={{ marginTop: '10px' }}>
					Уже есть аккаунт? <a href="/user/login">Войдите</a>
				</P>
			</div>
		</div>
	);
}