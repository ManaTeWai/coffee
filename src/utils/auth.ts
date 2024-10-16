import bcrypt from 'bcrypt';
import { supabase } from './supabase'; // Импортируй свой экземпляр Supabase

export const verifyUser = async (username: string, password: string) => {
	try {
		// Получаем пользователя из базы данных по имени пользователя
		const { data, error } = await supabase
			.from('Admins') // Имя таблицы
			.select('*')
			.eq('username', username)
			.single(); // Предполагается, что имя пользователя уникально

		if (error || !data) {
			throw new Error('Пользователь не найден');
		}

		// Проверяем пароль
		const isPasswordValid = await bcrypt.compare(password, data.hashed_password);

		if (isPasswordValid) {
			// Возвращаем данные пользователя, если пароль верный
			return { id: data.id, username: data.username }; // Можно добавить токен, если требуется
		} else {
			throw new Error('Неверный пароль');
		}
	} catch (err) {
		console.error('Ошибка проверки пользователя:', err);
		return null; // Возвращаем null в случае ошибки
	}
};
