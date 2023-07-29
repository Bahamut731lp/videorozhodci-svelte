<script>
    import { onMount } from "svelte";
    import { isRecording, isExamining } from "../stores/Recording";

    export let deviceId;
    export let isSourceOfRecording = true;
    export let disabled = false;

    let cameraSource = null;
    let playbackSource = null;

    let loading = false;
    let stream = null;
    let mediaRecorder = null;

    $: {
        if (mediaRecorder && cameraSource) {
            if ($isRecording) mediaRecorder.start(1000);
            else mediaRecorder.stop();
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

            cameraSource.srcObject = stream;
            cameraSource.play();
            loading = false;
        } catch (error) {
            console.error(error);
        }
    });

    onMount(async () => {
        if (!deviceId || !cameraSource || !isSourceOfRecording) return;

        mediaRecorder = new MediaRecorder(cameraSource.captureStream(), {
            mimeType: "video/webm",
        });

        mediaRecorder.addEventListener("dataavailable", async function (e) {
            fetch("http://127.0.0.1:8000/video", {
                method: "POST",
                headers: {
                    "x-device": deviceId,
                },
                body: e.data,
            });
        });
    });

    function onDragStart(event) {
        event.dataTransfer.setData("device", deviceId);
    }
</script>

<div draggable="true" on:dragstart={onDragStart}>
    {#if loading}
        <h1>LOADING</h1>
    {/if}

    <div class="relative">
        <!-- svelte-ignore a11y-media-has-caption -->
        <video
            class="object-contain absolute w-full h-full bg-black"
            class:opacity-0={!$isExamining}
            src={`http://localhost:8000/video?device=${deviceId}`}
            bind:this={playbackSource}
        />
        <!-- svelte-ignore a11y-media-has-caption -->
        <video class="object-contain" bind:this={cameraSource} />
    </div>
</div>
