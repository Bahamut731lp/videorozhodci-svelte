import { writable } from 'svelte/store';

export const isRecording = writable(false);
export const isPlaying = writable(false);