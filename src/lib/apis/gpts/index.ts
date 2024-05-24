import { GPTS_API_BASE_URL } from '$lib/constants';

export const getGPTsConfig = async (token: string, gptsId: string) => {
    return fetch(`${GPTS_API_BASE_URL}/load?id=${gptsId}`, {
        method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
    }).then(res => res.json())
}