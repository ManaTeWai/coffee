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

export default function Login() {
	const [email, setEmail] = useState(''); // Используем email вместо username
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	const handleLogin = async () => {
		try {
			// Вход через Supabase
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				setErrorMessage('Неправильный email или пароль');
				return;
			}

			// Если вход успешен, перенаправляем на страницу администратора
			router.push('/admin');
		} catch (error) {
			console.error('Ошибка при входе:', error);
			setErrorMessage('Произошла ошибка. Пожалуйста, попробуйте снова.');
		}
	};

	return (
		<div className={styles.page_wrapper}>
			<div className={styles.container}>
				<Htag tag='h1'>Форма авторизации</Htag>
				<StyledTextField
					label="Email"
					variant="filled"
					fullWidth
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
				<Button onClick={handleLogin} appearance="primary">
					Войти
				</Button>
			</div>
		</div>
	);
}