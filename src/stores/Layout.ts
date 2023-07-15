import { writable } from 'svelte/store';

export const layout = writable([{ rows: 2,columns: 2,devices: [] }]);
export const cursor = writable(0);