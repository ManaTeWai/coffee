import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { USER, PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: USER,
		pass: PASSWORD,
	},
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { name, subject, message } = req.body;

		const mailOptions = {
			from: USER,
			to: USER,
			subject: `Feedback from ${name}: ${subject}`,
			text: message,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ error: 'Error sending email' });
			} else {
				console.log('Email sent: ' + info.response);
				return res.status(200).json({ message: 'Email sent successfully' });
			}
		});
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
