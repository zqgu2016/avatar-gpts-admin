import { RAG_API_BASE_URL } from '$lib/constants';

export const getCollectionList = async (token: string, userId: string) => {
    return fetch(`${RAG_API_BASE_URL}?user_id=${userId}`, {
        method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
    }).then(res => res.json())
}

export const createCollection = async (token: string, userId: string, name: string) => {
    return fetch(`${RAG_API_BASE_URL}/create?user_id=${userId}&name=${name}`, {
        method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
    }).then(res => res.json())
}

export const renameCollection = async (token: string, userId: string, collectionId: string, newName: string) => {
    return fetch(`${RAG_API_BASE_URL}/${collectionId}/rename?user_id=${userId}&new_name=${newName}`, {
        method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
    }).then(res => res.json())
}

export const deleteCollection = async (token: string, userId: string, collectionId: string) => {
    return fetch(`${RAG_API_BASE_URL}/${collectionId}?user_id=${userId}`, {
        method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
    }).then(res => res.json())
}

export const uploadFiles = async (token: string, collectionId: string, file: File) => {
    const data = new FormData();
    data.append('files', file)

    return fetch(`${RAG_API_BASE_URL}/create?collection_id=${collectionId}`, {
        method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
        body: data
    }).then(res => res.json())
}