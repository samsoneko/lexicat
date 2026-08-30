import { redirect } from '@sveltejs/kit';

export function load({ data, url }) {
    const user = data?.user;
    const theme = data?.theme;
    
    const isLoginPage = url.pathname === '/login';
    const isRegisterPage = url.pathname === '/register';
    const isCoursePage = url.pathname === '/course';

    // Redirecting to login or register if user is not logged in
    if (!user && !isLoginPage && !isRegisterPage) {
        throw redirect(303, '/login');
    }

    // Redirecting to course selection if user is logged in, but has no course selected
    if (user && !user.course && !isCoursePage) {
        throw redirect(303, '/course');
    }

    // Redirecting to home page if the user is logged in and tries to access login or register
    if ((user && isLoginPage) || (user && isRegisterPage)) {
        throw redirect(303, '/');
    }

    return { user, theme };
}
