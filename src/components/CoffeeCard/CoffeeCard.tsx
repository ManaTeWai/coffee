import Link from 'next/link';
import { Htag, P } from '../';
import styles from './CoffeeCard.module.css';
import Image from 'next/image';

type Card = {
	imageUrl: string;
	title: string;
	description: string;
	price: number;
};

type CardsProps = {
	cards: Card[];
};

export const CoffeeCard = ({ cards, ...props }: CardsProps): JSX.Element => {
	return (
		<div className={styles.cardContainer}>
			{cards.map((card, index) => (
				<Link key={index} href={`/product/${index}`} className={styles.link}>
					<div className={styles.card}>
						<Image src={card.imageUrl} alt={card.title} width={200} height={200} className={styles.image} />
						<Htag tag='h1' className={styles.title}>{card.title}</Htag>
						<P size='medium' className={styles.description}>{card.description}</P>
						<P size='large'>Цена: <span className={styles.price}>{card.price} РУБ.</span></P>
					</div>
				</Link>
			))}
		</div>
	);
};
