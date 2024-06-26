import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { USER, PASSWORD } = process.env;

if (!USER || !PASSWORD) {
	throw new Error('Проблема с переменными dotenv');
}

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: USER,
		pass: PASSWORD,
	},
});

export async function POST(req: Request) {
	try {
		const { name, subject, message } = await req.json();
		console.log('Полученный запрос:', { name, subject, message });

		const mailOptions = {
			from: USER,
			to: USER,
			subject: `Feedback from ${name}: ${subject}`,
			text: message,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log('Письмо успешно отправлено:', info.response);

		return new Response(JSON.stringify({ message: 'Письмо успешно отправлено' }), {
			status: 200,
		});
	} catch (error) {
		console.error('Ошибка при отправке письма:', error);

		return new Response(JSON.stringify({ error: 'Ошибка при отправке письма' }), {
			status: 500,
		});
	}
}
