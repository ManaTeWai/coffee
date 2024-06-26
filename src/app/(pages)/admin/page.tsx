import { Htag, AdminItem } from '@/components';
import { products } from '@/utils/products';

export default function Admin() {
	return (
		<>
			<Htag tag='h1'>Admin</Htag>

			<AdminItem cards={products}/>
		</>
	);
}