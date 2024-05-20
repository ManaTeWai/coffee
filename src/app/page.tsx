import { Slider, Htag, P, CoffeeCard, CardPlaceHolder } from './components'
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

const cards = [
	{
		imageUrl: '/img/coffe1.png',
		title: 'Чашка кофе',
		description: 'Очень вкусная чашка кофе',
		prise: 100,
	},
	{
		imageUrl: '/img/coffe2.png',
		title: 'Чашка кофе',
		description: 'Очень очень вкусная чашка кофе',
		prise: 200,
	},
	{
		imageUrl: '/img/coffe1.png',
		title: 'Чашка кофе',
		description: 'Очень очень очень вкусная чашка кофе',
		prise: 300,
	},
	{
		imageUrl: '/img/coffe2.png',
		title: 'Чашка кофе',
		description: 'Очень очень очень очень вкусная чашка кофе',
		prise: 400,
	},
	{
		imageUrl: '/img/coffe1.png',
		title: 'Чашка кофе',
		description: 'Очень очень очень очень очень вкусная чашка кофе',
		prise: 500,
	}
]

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