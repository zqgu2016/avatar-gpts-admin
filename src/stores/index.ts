import { writable } from 'svelte/store';

const cons = localStorage.getItem('conversations');

export const conversations = writable(cons ? JSON.parse(cons) : []);
