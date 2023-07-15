import { readable } from 'svelte/store';

async function requestMediaPermissions() {
    const result = await navigator.permissions.query({name: "camera"});
    if (result.state == "granted") return;

    navigator.mediaDevices.getUserMedia({video: {}});
}

export const cameras = readable(null, function start(set) {
    requestMediaPermissions();

    navigator.mediaDevices.enumerateDevices()
    .then(mediaDevices => mediaDevices.filter(({ kind }) => kind === "videoinput"))
    .then(mediaDevices => mediaDevices.map(v => v.deviceId))
    .then(v => set(v))

    return function stop() {}
});