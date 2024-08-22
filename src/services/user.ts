import { supabase } from '@/utils/supabase'; // Импортируем клиента Supabase

export const registerAdminUser = async (email: string, password: string) => {
	// Регистрация пользователя
	const { user, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		console.error('Error registering user:', error.message);
		return { success: false, error: error.message };
	}

	// Обновление роли пользователя
	const { error: updateError } = await supabase
		.from('users')
		.update({ role: 'admin' })
		.eq('id', user?.id);

	if (updateError) {
		console.error('Error updating user role:', updateError.message);
		return { success: false, error: updateError.message };
	}

	return { success: true, user };
};
