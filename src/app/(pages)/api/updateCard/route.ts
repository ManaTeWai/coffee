// src/app/api/updateCard/updateCard.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Card } from '../../../../utils/products';

const dataFilePath = path.join(process.cwd(), 'src/utils/products.ts');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { index, updatedCard }: { index: number; updatedCard: Card } = req.body;

		try {
			// Чтение существующего файла
			const fileContents = fs.readFileSync(dataFilePath, 'utf8');
			const match = fileContents.match(/const products: Card\[\] = (\[.*\]);/s);

			if (!match) {
				throw new Error('Не удалось найти массив продуктов в файле');
			}

			const cards: Card[] = JSON.parse(match[1]);

			cards[index] = updatedCard;

			const updatedFileContents = fileContents.replace(
				/const products: Card\[\] = \[.*\];/s,
				`const products: Card[] = ${JSON.stringify(cards, null, 2)};`
			);

			fs.writeFileSync(dataFilePath, updatedFileContents);

			res.status(200).json({ message: 'Карточка обновлена' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: 'Ошибка при обновлении карточки', error: error.message });
			} else {
				res.status(500).json({ message: 'Неизвестная ошибка' });
			}
		}
	} else {
		res.status(405).json({ message: 'Метод не разрешен' });
	}
}
