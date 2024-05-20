import Image from 'next/image';
import styles from './loading.module.css';

export default function Loading() {
	return (
		<div className={styles.cont}>
			<Image src="./loading.svg" alt='loading' width={100} height={100} />
		</div>
	);
}