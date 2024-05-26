import { GPTS_API_BASE_URL } from '$lib/constants';

export const getGPTs = async (gptsId: string) => {
	return fetch(`${GPTS_API_BASE_URL}/load?id=${gptsId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(res => res.json())
}

export const getGPTsByOwner = async (userId: string) => {
	return fetch(`${GPTS_API_BASE_URL}/list_by_owner?user_id=${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(res => res.json())
}

export const getAllGPTs = async () => {
	return fetch(`${GPTS_API_BASE_URL}/list_all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(res => res.json())
}

export const getAvailableGPTs = async () => {
	return fetch(`${GPTS_API_BASE_URL}/list_available`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(res => res.json())
}

export const createGPTs = async (userId: string, formData) => {
	return fetch(`${GPTS_API_BASE_URL}/create?user_id=${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData)
	}).then(res => res.json())
}

export const updateGPTs = async (userId: string, formData) => {
	return fetch(`${GPTS_API_BASE_URL}/update?user_id=${userId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData)
	}).then(res => res.json())
}

export const deleteGPTs = async (userId: string, gptsId: string) => {
	return fetch(`${GPTS_API_BASE_URL}/delete?user_id=${userId}&gpts_id=${gptsId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(res => res.json())
}