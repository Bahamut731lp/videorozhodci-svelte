<script>
    import { cameras } from "../stores/Cameras";
    import Camera from "./Camera.svelte";
</script>

<section class="w-1/5 flex flex-col gap-4 items-center bg-neutral-100 border-l dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-50 p-4">
    <div class="grid gap-2 w-full">
        {#if !$cameras}
            <h1>LOADING</h1>
        {:else}
            {#each $cameras as cam}
                <Camera deviceId={cam} />
            {/each}
        {/if}
    </div>
</section>
