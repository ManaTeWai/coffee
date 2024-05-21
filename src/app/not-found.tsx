import Link from 'next/link';
import { Htag, P } from '@/components';
import styles from './not-found.module.css';

export default function NotFound() {
	return (
		<div className={styles.cont}>
			<div>
				<Htag tag='h1'>404 - Страница не найдена</Htag>
				<Link href="/"><P size='large'>Вернуться на главную</P></Link>
			</div>
		</div>
	);
}