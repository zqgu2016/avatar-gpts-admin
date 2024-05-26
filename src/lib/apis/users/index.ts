import { USER_API_BASE_URL } from '$lib/constants'

export const getUserProfile = async (userId: string) => {
	return fetch(`${USER_API_BASE_URL}/get_profile?user_id=${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(res => res.json())
}

export const saveUserProfile = async (userId: string, profile: string) => {
	return fetch(`${USER_API_BASE_URL}/save_profile?user_id=${userId}&profile=${encodeURIComponent(profile)}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(res => res.json())
}

export const deleteUserProfile = async (userId: string) => {
	return fetch(`${USER_API_BASE_URL}?user_id=${userId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(res => res.json())
}