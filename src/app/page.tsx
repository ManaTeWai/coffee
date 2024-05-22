import { Slider, Htag, P, CoffeeCard, CardPlaceHolder } from '@/components'
import { cards } from '@/utils/products';
import styles from './page.module.css'

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
					<Slider slides={slides} />
					<CoffeeCard cards={cards}/>
					<CardPlaceHolder />
				</div>
			</main>
		</>
	);
}