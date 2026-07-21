// Share user session with frontend
export function load({ locals }) {
    return {
        user: locals.user
    };
}