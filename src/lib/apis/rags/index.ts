import { RAG_API_BASE_URL } from '$lib/constants';

export const getCollectionList = async (userId: string) => {
  return fetch(`${RAG_API_BASE_URL}?user_id=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};

export const createCollection = async (userId: string, name: string) => {
  return fetch(`${RAG_API_BASE_URL}/create?user_id=${userId}&name=${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};

export const renameCollection = async (userId: string, collectionId: string, newName: string) => {
  return fetch(
    `${RAG_API_BASE_URL}/${collectionId}/rename?user_id=${userId}&new_name=${encodeURIComponent(newName)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then((res) => res.json());
};

export const deleteCollection = async (userId: string, collectionId: string) => {
  return fetch(`${RAG_API_BASE_URL}/${collectionId}?user_id=${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};

export const getFileListByCollectionId = async (collectionId: string) => {
  return fetch(`${RAG_API_BASE_URL}/${collectionId}/files`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};

export const uploadFile = async (collectionId: string, file: File) => {
  const data = new FormData();
  data.append('file', file);

  return fetch(`${RAG_API_BASE_URL}/${collectionId}/files/upload_one_file/`, {
    method: 'POST',
    body: data
  }).then((res) => res.json());
};

export const uploadFiles = async (collectionId: string, files: File[]) => {
  const data = new FormData();
  files.forEach((file) => data.append('files', file));

  return fetch(`${RAG_API_BASE_URL}/${collectionId}/files/upload_files/`, {
    method: 'POST',
    body: data
  }).then((res) => res.json());
};

export const deleteFile = async (collectionId: string, fileId: string) => {
  return fetch(`${RAG_API_BASE_URL}/${collectionId}/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};
