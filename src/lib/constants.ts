import { browser, dev } from '$app/environment';

export const WEBUI_BASE_URL = browser ? (dev ? `http://${location.hostname}:9000` : ``) : ``;

export const GPTS_API_BASE_URL = `${WEBUI_BASE_URL}/gpts_config`;
export const RAG_API_BASE_URL = `${WEBUI_BASE_URL}/rag/collections`;
export const USER_API_BASE_URL = `${WEBUI_BASE_URL}/user_profile`;
export const MESSAGE_API_BASE_URL = `${WEBUI_BASE_URL}/messages`;
export const CHAT_API_BASE_URL = `${WEBUI_BASE_URL}/chats`;

export const PROJECT_NAME = 'Avatar GPTs';

export const EXPLORE_GPTS_MENU = 'Explore GPTs';
export const COLLECTIONS_MENU = 'Collections';
export const USER_PROFILES_MENU = 'User Profiles';

export const SIDEBAR_MENUS = [EXPLORE_GPTS_MENU, COLLECTIONS_MENU, USER_PROFILES_MENU];
