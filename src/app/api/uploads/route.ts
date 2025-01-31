import formidable from 'formidable';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const form = new formidable.IncomingForm();
		form.uploadDir = path.join(process.cwd(), 'public/uploads');
		form.keepExtensions = true;

		form.parse(req, (err, fields, files) => {
			if (err) {
				return res.status(500).json({ error: 'Ошибка загрузки файла' });
			}

			const file = files.file;
			const filePath = path.join('/uploads', path.basename(file.path));
			res.status(200).json({ imageUrl: filePath });
		});
	} else {
		res.status(405).end(); // Метод не разрешен
	}
}
