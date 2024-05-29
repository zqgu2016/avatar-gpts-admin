import { browser, dev } from '$app/environment';

export const WEBUI_BASE_URL = browser ? (dev ? `http://${location.hostname}:9000` : ``) : ``;

export const GPTS_API_BASE_URL = `${WEBUI_BASE_URL}/gpts_config`;
export const RAG_API_BASE_URL = `${WEBUI_BASE_URL}/rag/collections`;
export const USER_API_BASE_URL = `${WEBUI_BASE_URL}/user_profile`;
export const MESSAGE_API_BASE_URL = `${WEBUI_BASE_URL}/messages`;
export const CHAT_API_BASE_URL = `${WEBUI_BASE_URL}/chats`;

export const user_id = '82bae850-e2c4-49c4-a912-843dcf3b5f42';

export const PROJECT_NAME = 'Avatar GPTs';

export const EXPLORE_GPTS_MENU = 'Explore GPTs';
export const COLLECTIONS_MENU = 'Collections';
export const USER_PROFILE_MENU = 'User Profile';

export const SIDEBAR_MENUS = [EXPLORE_GPTS_MENU, COLLECTIONS_MENU, USER_PROFILE_MENU];
