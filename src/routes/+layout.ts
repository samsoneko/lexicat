import { redirect } from '@sveltejs/kit';

export function load({ data, url }) {
    const user = data?.user; 
    
    const isLoginPage = url.pathname === '/login';
    const isRegisterPage = url.pathname === '/register';

    // Redirecting to login or register if user is not logged in
    if (!user && !isLoginPage && !isRegisterPage) {
        throw redirect(303, '/login');
    }

    if (user && (isLoginPage || isRegisterPage)) {
        throw redirect(303, '/dashboard');
    }

    return { user };
}
