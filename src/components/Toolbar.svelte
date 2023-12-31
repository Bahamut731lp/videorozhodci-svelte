<script lang="ts">
    import { layout, cursor } from "../stores/Layout";

    let numberOfRows = $layout[$cursor].rows;
    let numberOfColumns = $layout[$cursor].columns;

    function setOneWindowLayout() {
        $layout = [{rows: 1, columns: 1, devices: []}, ...$layout];
        $cursor = 0;
    }

    function setTwoByTwoLayout() {
        $layout = [{rows: 2, columns: 2, devices: []}, ...$layout];
        $cursor = 0;
    }

    function setLayout(value, key: keyof Omit<typeof $layout, "history">) {
        let parsedValue = parseInt(value);
        if (Number.isNaN(parsedValue)) return;

        $layout[$cursor][key] = parsedValue;
    }

    function setHistoryCursorRelative(offset: number) {
        let length = $layout.length;
        let absolute = $cursor - offset;

        $cursor = Math.min(length - 1, Math.max(0, absolute))
    }

</script>

<div class="bg-neutral-200 dark:bg-neutral-900 w-full grid grid-cols-3 p-2">
    <div class="flex items-center gap-2">
        <button class="bg-green-600 px-4 py-2">Začátek zápasu</button>
        <button class="bg-red-600 px-4 py-2">Začít přehrávat</button>
    </div>
    <div class="place-self-center flex gap-1">
        <button class="bg-neutral-700 p-2" on:click={setOneWindowLayout}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width={1.5}
                stroke="currentColor"
                CLASS="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
                />
            </svg>
        </button>

        <button class="bg-neutral-700 p-2" on:click={setTwoByTwoLayout}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width={1.5}
                stroke="currentColor"
                CLASS="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
            </svg>
        </button>

        <div class="flex">
            <div class="bg-neutral-700 p-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width={1.5}
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z"
                    />
                </svg>
            </div>
            <div class="bg-neutral-800">
                <input
                    type="number"
                    min="1"
                    max="20"
                    step="1"
                    class="w-12 h-full text-center text-neutral-400 bg-transparent"
                    bind:value={numberOfColumns}
                    on:input={() => setLayout(numberOfColumns, "columns")}
                />
            </div>
        </div>

        <div class="flex">
            <div class="bg-neutral-700 p-2">
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
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
            <div class="bg-neutral-800">
                <input
                    type="number"
                    min="1"
                    max="20"
                    step="1"
                    class="w-12 h-full text-center text-neutral-400 bg-transparent"
                    bind:value={numberOfRows}
                    on:input={() => setLayout(numberOfRows, "rows")}
                />
            </div>
        </div>
    </div>
    <div class="place-self-end flex gap-2">
        <!-- 
            Po kliknutí na tohle tlačítko vyjede spodní lišta, videa se pauznou a ukáží se místo toho playbacky
            Nebude časová osa, bude prostě jenom dopředu a dozadu!
        -->
        <button class="bg-neutral-700 p-2" on:click={() => setHistoryCursorRelative(-1)}>
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
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
            </svg>
        </button>

        <button class="bg-neutral-700 p-2" on:click={() => setHistoryCursorRelative(1)}>
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
            </svg>
        </button>
    </div>
</div>
