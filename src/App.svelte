<script lang="ts">
    import { isExamining } from "./stores/Recording";

    import Sidebar from "./components/Sidebar.svelte";
    import Toolbar from "./components/Toolbar.svelte";
    import Previews from "./components/Previews.svelte";
    import PlaybackControls from "./components/PlaybackControls.svelte"
</script>

<svelte:head>
    <title>Videorozhodčí</title>
</svelte:head>

<main
    class="bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-white min-h-screen flex"
>
    <section
        class="w-4/5 max-h-full flex flex-col items-center justify-between"
    >
        <Toolbar/>
        <Previews/>

        <svelte:component this={$isExamining ? PlaybackControls : null}/>
    </section>

    <Sidebar />
</main>
