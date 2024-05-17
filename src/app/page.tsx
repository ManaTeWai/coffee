import styles from "./page.module.css";
import Image from 'next/image';
import { Slider, Htag, P } from '../../components'

const slides = [
  {
    imageUrl: '/img/first_slide.jpg',
    title: 'Раф',
  },
  {
    imageUrl: '/img/second_slide.jpg',
    title: 'Капучино',
  },
];

export default function Home() {

  return (
    <>
      <main>
        <div className={styles.main}>
          <Htag tag='h1'>Наша кофейня работает с любовью для вас!</Htag>
        </div>
        <Slider slides={slides} />
      </main>
    </>
  );
}
