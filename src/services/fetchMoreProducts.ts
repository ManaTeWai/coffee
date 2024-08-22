import { supabase } from '@/utils/supabase';

export const fetchMoreProducts = async (offset: number) => {
	const { data, error } = await supabase
		.from('Products')
		.select('*')
		.range(offset, offset + 8); 

	if (error) {
		console.error('Ошибка зарузки данных:', error);
		return [];
	}

	return data || [];
};
