<script>
    import Camera from "./Camera.svelte";
    import { layout, cursor } from "../stores/Layout";

    export let deviceId = null;
    export let index = null;

    function onDragOver(event) {
        event.preventDefault();
    }

    function onDragDrop(event) {
        event.preventDefault();
        deviceId = event.dataTransfer.getData("device");
        $layout[$cursor].devices[index] = deviceId;
    }

    function onDeleteClick(event) {
        event.stopImmediatePropagation();
        deviceId = null;
    }

    function onCameraClick() {
        if (!deviceId) return;

        if ($cursor > 0) {
            $layout = $layout.slice($cursor);
        }

        $layout = [{rows: 1, columns: 1, devices: [deviceId]}, ...$layout];
        $cursor = 0;
    }
</script>

<button
    class="bg-neutral-800 text-neutral-500 relative"
    on:drop={onDragDrop}
    on:dragover={onDragOver}
    on:click={onCameraClick}
>
    {#if !deviceId}
        <div class="w-full h-full grid place-items-center">
            <h1>Prázdný slot na kameru</h1>
        </div>
    {:else}
        <div class="absolute bg-black/30 px-2 py-1 right-0 z-10">
            <button 
                on:click={onDeleteClick}
                class="text-neutral-200 cursor-pointer hover:text-white"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </button>
        </div>

        <Camera {deviceId} />
    {/if}
</button>
