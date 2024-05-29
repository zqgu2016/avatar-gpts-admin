import { writable } from 'svelte/store';

const conversations_str = localStorage.getItem('conversations');
const user_profile_str = localStorage.getItem('user_profile');

export const currentUserId = writable(user_profile_str || '');
export const conversations = writable(conversations_str ? JSON.parse(conversations_str) : []);
