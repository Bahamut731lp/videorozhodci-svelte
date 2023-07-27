<script>
    import { onMount } from "svelte";
    import { isRecording } from "../stores/Recording";

    export let deviceId;

    let videoSource = null;
    let loading = false;
    let stream = null;
    let mediaRecorder = null;

    $ : {
        if (mediaRecorder) {
            if ($isRecording) startRecording();
            else stopRecording();
        }

    }

    onMount(async () => {
        if (!deviceId) return;

        try {
            loading = true;

            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId,
                    width: 1920,
                    height: 1080,
                },
            });

            videoSource.srcObject = stream;
            videoSource.play();
            loading = false;

            mediaRecorder = new MediaRecorder(videoSource.captureStream(), {
                mimeType: "video/webm"
            });
            
            mediaRecorder.addEventListener('dataavailable', async function (e) {
                fetch("http://127.0.0.1:8000/video", {
                    method: "POST",
                    headers: {
                        "x-device": deviceId
                    },
                    body: e.data
                });
            });

        } catch (error) {
            console.error(error);
        }
    });

    function onDragStart(event) {
        event.dataTransfer.setData("device", deviceId)
    }

    function startRecording() {
        mediaRecorder.start(1000);
    }

    function stopRecording() {
        mediaRecorder.stop();
    }


</script>

<div
    draggable="true"
    on:dragstart={onDragStart}
>
    {#if loading}
        <h1>LOADING</h1>
    {/if}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video
        class="object-contain" 
        bind:this={videoSource} />
</div>
