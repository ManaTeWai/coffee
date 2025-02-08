import { Htag, P } from '@/components';
import styles from './page.module.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Кофе Тайм || Зерна",
	description: "Coffee to portfolio",
};

export default function Ceeds() {
	return (
		<>
			<Htag tag="h1">Наши кофейные зёрна</Htag>
			<P size="large">Откройте для себя уникальные вкусы наших кофейных зёрен из разных уголков мира.</P>

			<div className={styles.beans}>
				<div className={styles.beanCard}>
					<Htag tag="h2">Арабика (Эфиопия)</Htag>
					<P size="medium">Описание: Насыщенный вкус с нотками ягод и цитрусов.</P>
					<P size="medium">Степень обжарки: Средняя</P>
					<P size="medium">Кислотность: Высокая</P>
				</div>
				<div className={styles.beanCard}>
					<Htag tag="h2">Робуста (Вьетнам)</Htag>
					<P size="medium">Описание: Крепкий и насыщенный вкус с горьковатыми нотами.</P>
					<P size="medium">Степень обжарки: Тёмная</P>
					<P size="medium">Кислотность: Низкая</P>
				</div>
				<div className={styles.beanCard}>
					<Htag tag="h2">Арабика (Колумбия)</Htag>
					<P size="medium">Описание: Сбалансированный вкус с нотами карамели и орехов.</P>
					<P size="medium">Степень обжарки: Средняя</P>
					<P size="medium">Кислотность: Средняя</P>
				</div>
				<div className={styles.beanCard}>
					<Htag tag="h2">Арабика (Колумбия)</Htag>
					<P size="medium">Описание: Сбалансированный вкус с нотами карамели и орехов.</P>
					<P size="medium">Степень обжарки: Средняя</P>
					<P size="medium">Кислотность: Средняя</P>
				</div>
				<div className={styles.beanCard}>
					<Htag tag="h2">Арабика (Колумбия)</Htag>
					<P size="medium">Описание: Сбалансированный вкус с нотами карамели и орехов.</P>
					<P size="medium">Степень обжарки: Средняя</P>
					<P size="medium">Кислотность: Средняя</P>
				</div>
				<div className={styles.beanCard}>
					<Htag tag="h2">Арабика (Колумбия)</Htag>
					<P size="medium">Описание: Сбалансированный вкус с нотами карамели и орехов.</P>
					<P size="medium">Степень обжарки: Средняя</P>
					<P size="medium">Кислотность: Средняя</P>
				</div>
				<div className={styles.beanCard}>
					<Htag tag="h2">Арабика (Колумбия)</Htag>
					<P size="medium">Описание: Сбалансированный вкус с нотами карамели и орехов.</P>
					<P size="medium">Степень обжарки: Средняя</P>
					<P size="medium">Кислотность: Средняя</P>
				</div>
				<div className={styles.beanCard}>
					<Htag tag="h2">Арабика (Колумбия)</Htag>
					<P size="medium">Описание: Сбалансированный вкус с нотами карамели и орехов.</P>
					<P size="medium">Степень обжарки: Средняя</P>
					<P size="medium">Кислотность: Средняя</P>
				</div>
				<div className={styles.beanCard}>
					<Htag tag="h2">Арабика (Колумбия)</Htag>
					<P size="medium">Описание: Сбалансированный вкус с нотами карамели и орехов.</P>
					<P size="medium">Степень обжарки: Средняя</P>
					<P size="medium">Кислотность: Средняя</P>
				</div>
			</div>
		</>
	);
}