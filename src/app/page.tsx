import styles from "./page.module.css";
import Image from 'next/image';
import { Slider, Htag, P } from '../../components'

export default function Home() {

  const slides = [
    {
      imageUrl: '/img/slide1.png',
      title: 'Певец',
      text: 'Градов Иван Александрович',
    },
    {
      imageUrl: '/img/slide2.png',
      title: 'Актриса',
      text: 'Нефедова Валерия Сергеевна',
    },
    {
      imageUrl: '/img/slide3.png',
      title: 'Блоггер',
      text: 'Жданова Ирина Андреевна',
    },
  ];

  return (
    <>
      <main>
        <div className={styles.main}>
          <Htag tag='h1'>Наша кофейня работает с любовью для вас!</Htag>
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

        <div className={styles.guests}>
          <div className={styles.guests__header}>
            <Htag tag='h3'>Наши знаменитые гости</Htag>
          </div>

          <Slider slides={slides} />

        </div>
      </main>
    </>
  );
}
