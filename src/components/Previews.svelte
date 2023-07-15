<script>
    import BigPicture from "./BigPicture.svelte";
    import { layout, cursor } from "../stores/Layout";

    let style = "";
    let length = 0;

    $: {
        style = `
            grid-template-rows: repeat(${$layout[$cursor].rows}, 1fr);
            grid-template-columns: repeat(${$layout[$cursor].columns}, 1fr);
        `;

        length = $layout[$cursor].rows * $layout[$cursor].columns;

        console.log($cursor, $layout)
    }
</script>

<section class="grid h-full w-full p-2 gap-2 relative" {style}>
    {#each { length } as _, index}
        {#key $layout?.[$cursor]?.devices?.[index] ?? null }
            <BigPicture deviceId={$layout?.[$cursor]?.devices?.[index] ?? null} {index}/>
        {/key}
    {/each}
</section>
