import bcrypt from 'bcrypt';
import { supabase } from '@/utils/supabase'; // Импортируй свой экземпляр Supabase
import { v4 as uuidv4 } from 'uuid'; // Для генерации токена, если нужно

interface User {
	id: number;
	username: string;
	token?: string; // Добавь опциональное свойство токена
}

export const verifyUser = async (username: string, password: string): Promise<User | null> => {
	try {
		const { data, error } = await supabase
			.from('Admins')
			.select('*')
			.eq('username', username)
			.single();

		if (error || !data) {
			throw new Error('Пользователь не найден');
		}

		const isPasswordValid = await bcrypt.compare(password, data.hashed_password);

		if (isPasswordValid) {
			// Генерация токена (например, UUID или JWT)
			const token = uuidv4(); // Используй свою логику генерации токена
			return { id: data.id, username: data.username, token }; // Добавь токен в возвращаемый объект
		} else {
			throw new Error('Неверный пароль');
		}
	} catch (err) {
		console.error('Ошибка проверки пользователя:', err);
		return null;
	}
};
