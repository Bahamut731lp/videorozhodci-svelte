<script>
    import Camera from "./Camera.svelte";

    let deviceId = null;

    function onDragOver(event) {
        event.preventDefault();
    }

    function onDragDrop(event) {
        event.preventDefault();
        deviceId = event.dataTransfer.getData("device")
    }

</script>

<div 
    class="bg-neutral-800 text-neutral-500"
    on:drop={onDragDrop}
    on:dragover={onDragOver}
>
    {#if !deviceId}
        <h1>CHYBA NENÍ NA VAŠEM PŘIJÍMAČI</h1>
    {:else}
        <Camera {deviceId}/>
    {/if}
</div>