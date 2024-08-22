import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase'; // Импортируем клиента Supabase

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'DELETE') {
		const { id } = req.body;

		if (!id) {
			return res.status(400).json({ error: 'Invalid request' });
		}

		// Проверка авторизации (если требуется)
		const user = supabase.auth.user();
		if (!user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		// Проверка прав пользователя
		const { data: userData, error: userError } = await supabase
			.from('users')
			.select('role')
			.eq('id', user.id)
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

		return res.status(200).json({ message: 'Card deleted successfully' });
	} else {
		res.setHeader('Allow', ['DELETE']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
