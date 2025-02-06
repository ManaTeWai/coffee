'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { Button, Htag, P } from '@/components';
import { styled } from '@mui/system';
import styles from './page.module.css'
import bcrypt from 'bcryptjs';

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

export default function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	const handleLogin = async () => {
		try {
			const { data, error } = await supabase
				.from('Admins')
				.select('id, password_hash')
				.eq('username', username)
				.single();

			if (error || !data) {
				setErrorMessage('Неправильное имя пользователя или пароль');
				return;
			}

			const isMatch = await bcrypt.compare(password, data.password_hash);
			if (isMatch) {
				// Перенаправляем на страницу администратора
				router.push('/admin');
			} else {
				setErrorMessage('Неправильное имя пользователя или пароль');
			}
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
				<Button onClick={handleLogin} appearance="primary">
					Войти
				</Button>
			</div>
		</div>
	);
};
