import { Htag, P } from '../';
import styles from './ReviewItem.module.css';
import Image from 'next/image';

type Review = {
	ImageType: string;
	author: string;
	text: string;
};

type Reviews = {
	reviews: Review[];
}

export const ReviewItem = ({ reviews }: Reviews) => {

	const review = reviews;
	return (
		<div className={styles.reviews}>
			{review.map((item, index) => (
				<div className={styles.reviewbox} key={index}>
					<div className={styles.review}>
						<Image src={item.ImageType} width={100} height={100} alt='фото профиля' />
						<div className={styles.text}>
							<Htag tag="h1">{item.author}</Htag>
							<P size="medium">{item.text}</P>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};