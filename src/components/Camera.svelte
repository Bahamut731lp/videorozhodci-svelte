<script>
    import { onMount } from "svelte";

    export let deviceId;

    let videoSource = null;
    let loading = false;
    let stream = null;

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
        } catch (error) {
            console.error(error);
        }
    });

    function onDragStart(event) {
        event.dataTransfer.setData("device", deviceId)
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
