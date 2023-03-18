<script>
    import {onMount} from "svelte";
    import Score from "$lib/components/Score.svelte";
    import PopupContent from '$lib/components/PopupContent.svelte';

    onMount(async () => {
        await import('tw-elements');
    });

    let isPopupOpen = false;
    let message = 'Hello, world!';

    function openPopup() {
        isPopupOpen = true;
    }

    function closePopup() {
        isPopupOpen = false;
    }

    export let data;
</script>
<!--todo: 해당 리그의 포함되어 있는 곡들이 드롭다운 형태로 나오게 한뒤 클릭시 해당 곡의 점수를 보여줌.-->
<div aria-label="Main" class="bg-zinc-800">
    {#each data.songsList as {...args}, index }
        <button class="gird grid-cols-1 gap-4 py-4 w-full"
                on:click
                type="button"q
                data-te-collapse-init
                data-te-ripple-init
                data-te-ripple-color="light"
                href="#collapseExample{index + 1}"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample{index + 1}"
        >
            <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                <div class="flex items-center space-x-2 text-sm">
                    <div><span class="text-blue-500 font-bold">#{index + 1}</span> {args.songModeType} -
                        {#if args.songDifficulty === "ExpertPlus"}
                            <span class="p-1.5 text-white text-xs font-medium uppercase tracking-wider text-green-800 bg-purple-700 rounded-lg">Expert Plus</span>
                            {:else if args.songDifficulty === "Expert"}
                            <span class="p-1.5 text-white text-xs font-medium uppercase tracking-wider text-green-800 bg-red-500 rounded-lg">{args.songDifficulty}</span>
                            {:else if args.songDifficulty === "Hard"}
                            <span class="p-1.5 text-white text-xs font-medium uppercase tracking-wider text-green-800 bg-orange-400 rounded-lg">{args.songDifficulty}</span>
                        {:else if args.songDifficulty === "Normal"}
                            <span class="p-1.5 text-white text-xs font-medium uppercase tracking-wider text-green-800 bg-sky-400 rounded-lg">{args.songDifficulty}</span>
                        {:else}
                            <span class="p-1.5 text-white text-xs font-medium uppercase tracking-wider text-green-800 bg-green-700 rounded-lg">{args.songDifficulty}</span>

                        {/if}
                    </div>
                    <a href="https://beatsaver.com/maps/{args.songId}" target="_blank">
                    <div class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg">
                        !bsr {args.songId}
                    </div>
                    </a>
                    <button on:click={openPopup}>미리보기</button>
                    {#if isPopupOpen}
                        <div class="overlay" on:click={closePopup}>
                            <PopupContent message={args.songId} onClose={closePopup}/>
                        </div>
                    {/if}
                </div>
                <div class="flex  space-x-2 text-sm w-full">
                    <div class="flex ">
                        <img src="{args.coverUrl}" alt="리그사진" class="w-40">
                        <div class="px-5 flex-col ">
                            <p class="text-3xl">{args.songName}</p>
                            <p class="text-xl">Mapper: <span class="bg-sky-400 text-white px-3 rounded-full">{args.uploaderName}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </button>
        <div class="!visible hidden" id="collapseExample{index + 1}" data-te-collapse-item>
            <div class="rounded-lg bg-white p-6 shadow-lg">
                <Score songSeq={args.seq} />
            </div>
        </div>
    {/each}
</div>

