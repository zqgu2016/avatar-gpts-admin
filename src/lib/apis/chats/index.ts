import { CHAT_API_BASE_URL } from '$lib/constants';

export const getChatsByGPTsId = async (userId: string, gptsId: string) => {
  return fetch(`${CHAT_API_BASE_URL}?user_id=${userId}&gpts_id=${gptsId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};

export const deleteChatsByGPTsId = async (userId: string, gptsId: string) => {
  return fetch(`${CHAT_API_BASE_URL}?user_id=${userId}&gpts_id=${gptsId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};
