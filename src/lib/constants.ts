import { browser, dev } from '$app/environment';

export const WEBUI_BASE_URL = browser ? (dev ? `http://${location.hostname}:9000` : ``) : ``;

export const GPTS_API_BASE_URL = `${WEBUI_BASE_URL}/gpts_config`;
export const RAG_API_BASE_URL = `${WEBUI_BASE_URL}/rag/collections`;
export const USER_API_BASE_URL = `${WEBUI_BASE_URL}/user_profile`;
export const MESSAGE_API_BASE_URL = `${WEBUI_BASE_URL}/messages`;
export const CHAT_API_BASE_URL = `${WEBUI_BASE_URL}/chats`;

export const user_id = '82bae850-e2c4-49c4-a912-843dcf3b5f42'
export const gpts_id = '60d99596-1417-11ef-a79c-00155d1b30ba'
export const collection_id = '72f55171f9d74ae2aa8e14c1551193a6'