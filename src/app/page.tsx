import { Slider, Htag, P, DynamicCoffeeCardLoader } from '@/components'
import styles from './page.module.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Кофе Тайм || Главная",
};


const slides = [
	{
		imageUrl: '/img/first_slide.jpg',
		title: 'Раф',
	},
	{
		imageUrl: '/img/second_slide.jpg',
		title: 'Капучино',
	},
	{
		imageUrl: '/img/third_slide.jpg',
		title: 'Ева',
	},
];

const slides_mobile = [
	{
		imageUrl: '/img/first_slide_mob.jpg',
		title: 'Раф',
	},
	{
		imageUrl: '/img/second_slide_mob.jpg',
		title: 'Капучино',
	},
	{
		imageUrl: '/img/third_slide_mob.jpg',
		title: 'Ева',
	},
];

export default function Home() {

	return (
		<>
			<main>
				<div className={styles.main}>
					<Htag tag='h1'>Наша кофейня работает с любовью для вас!</Htag>
					<Slider slides={slides} slides_mobile={slides_mobile} />
					<DynamicCoffeeCardLoader />
				</div>
			</main>
		</>
	);
}