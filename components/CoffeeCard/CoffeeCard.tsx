import { Htag, P } from '../';
import styles from './CoffeeCard.module.css';
import Image from 'next/image';

type Card = {
	imageUrl: string;
	title: string;
	description: string;
	prise: number;
};

type CardsProps = {
	cards: Card[];
};

export const CoffeeCard = ({ cards, ...props }: CardsProps): JSX.Element => {
	return (
		<div className={styles.cardContainer}>
			{cards.map((card, index) => (
				<div key={index} className={styles.card}>
					<Image src={card.imageUrl} alt={card.title} width={200} height={200} className={styles.image} />
					<Htag tag='h1' className={styles.title}>{card.title}</Htag>
					<P size='medium' className={styles.description}>{card.description}</P>
					<P size='large'>Цена: <span className={styles.price}>{card.prise} РУБ.</span></P>
				</div>
			))}
		</div>
	);
}