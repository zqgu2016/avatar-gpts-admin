import { MESSAGE_API_BASE_URL } from '$lib/constants';

export const sendMessage = async (message: any) => {
  return fetch(`${MESSAGE_API_BASE_URL}/send_message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });
};
