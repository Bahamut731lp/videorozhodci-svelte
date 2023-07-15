<script>
    import BigPicture from "./BigPicture.svelte";
    import { layout } from "../stores/Layout";

    let style = "";
    let length = 0;

    $: {
        style = `
            grid-template-rows: repeat(${$layout.rows}, 1fr);
            grid-template-columns: repeat(${$layout.columns}, 1fr);
        `;

        length = $layout.rows * $layout.columns;
    }
</script>

<section class="grid h-full w-full p-2 gap-2 relative" {style}>
    {#each { length } as _, index}
        {#key $layout.history?.[$layout.cursor]?.[index] ?? null }
            <BigPicture deviceId={$layout.history?.[$layout.cursor]?.[index] ?? null} {index}/>
        {/key}
    {/each}
</section>
