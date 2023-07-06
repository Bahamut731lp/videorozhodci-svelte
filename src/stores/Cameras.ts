import { readable } from 'svelte/store';

export const cameras = readable(null, function start(set) {

    navigator.mediaDevices.enumerateDevices()
    .then(mediaDevices => mediaDevices.filter(({ kind }) => kind === "videoinput"))
    .then(mediaDevices => mediaDevices.map(v => v.deviceId))
    .then(v => set(v))

    return function stop() {}
});