import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from './schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';

interface AuthCookie {
	createdAt: number; // unix epoch seconds
	email: string;
}

export async function load({ cookies }) {
	const form = await superValidate(zod(loginSchema));
	try {
		const auth = JSON.parse(cookies.get('auth') ?? 'null') as AuthCookie | null;
		if (auth && auth.createdAt + 60 * 60 * 24 * 7 > Date.now() / 1000) {
			return {
				auth,
				form
			};
		}
	} catch (e) {
		cookies.delete('auth', { path: '/' });
	}

	return {
		form
	};
}

export const actions: Actions = {
	async default(event) {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const { email, password } = form.data;
		if (email === process.env.EMAIL && password === process.env.PASSWORD) {
			event.cookies.set('auth', JSON.stringify({ email, createdAt: Date.now() / 1000 }), {
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
				httpOnly: true,
				sameSite: 'strict'
			});
			redirect(302, '/');
		}

		return fail(401, { form });
	}
};
