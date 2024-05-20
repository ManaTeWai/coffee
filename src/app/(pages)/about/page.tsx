import { Htag, P } from '../../components';
import type { Metadata } from "next";
import styles from '../../page.module.css';
import Image from 'next/image';

export const metadata: Metadata = {
	title: "Кофе Тайм || About",
	description: "Coffee to portfolio",
};

export default function About() {
	return (
		<>
			<div className={styles.first}>
				<Htag tag='h1'>Наша кофейня работает с любовью для вас!</Htag>
				<Image src="/img/coffe1.png" width={200} height={200} alt='чашка кофе' />
			</div>
			<Htag tag="h1">About</Htag>
			<div className={styles.guests}>
				<div className={styles.guests__header}>
					<Htag tag='h3'>Наши знаменитые гости</Htag>
				</div>
			</div>

			{/* <div className={styles.banner1}>
              <Htag tag='h1'>Наша кофейня работает с любовью для вас!</Htag>
          </div>
        <div className={styles.unit}>
          <div className={styles.unit__section}>
            <Image src="/img/zerno2.png" alt="" className={styles.unit__section__img} width={100} height={100} />
          </div>
          <div className={styles.unit__section}>
            <div className={styles.unit__section__text}>
              <Htag tag='h3'>Что наши зерна говорят о качестве?</Htag>
              <P size='medium'>Современные технологии достигли такого уровня, что граница обучения кадров требует анализа своевременного выполнения сверхзадачи. Как принято считать, интерактивные прототипы, вне зависимости
                от их уровня.</P>
            </div>
          </div>
        </div> */}

			{/* <div className={styles.unit} id="unit_2">
          <div className={styles.unit__section}>
            <div className={styles.unit__section__text}>
              <Htag tag='h3'>Почему именно наше кофе?</Htag>
              <P size='medium'>Таким образом, высокое качество позиционных исследований предполагает независимые способы реализации прогресса профессионального сообщества. Лишь непосредственные участники технического прогресса.</P>
            </div>
          </div>
          <div className={styles.unit__section}>
            <Image src="/img/coffe2.png" alt="" className={styles.unit__section__img} width={100} height={100} />
          </div>
        </div> */}

		</>
	);
}