import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase'; // Импортируем клиента Supabase

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'DELETE') {
		const { id } = req.body;

		if (!id) {
			return res.status(400).json({ error: 'Invalid request' });
		}

		// Проверка прав пользователя
		const { data: userData, error: userError } = await supabase
			.from('users')
			.select('role')
			.single();

		if (userError || userData.role !== 'admin') {
			return res.status(403).json({ error: 'Forbidden' });
		}

		// Удаление данных из базы
		const { error } = await supabase
			.from('Products')
			.delete()
			.eq('id', id);

		if (error) {
			return res.status(500).json({ error: error.message });
		}

		res.status(200).json({ message: 'Карточка успешно удалена' });
	} else {
		res.status(405).json({ message: 'Метод не разрешен' });
	}
}
