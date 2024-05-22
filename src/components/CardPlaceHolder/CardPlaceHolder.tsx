import { Htag } from '@/components';
import styles from './CardPlaceHolder.module.css'

export const CardPlaceHolder = () => {
	return (
		<div className={styles.placeholder}>
			<Htag tag='h1'>Placeholder</Htag>
		</div>
	);
}