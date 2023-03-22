<script>

    import PopupContent from "$lib/components/PopupContent.svelte";

    export let args;
    export let index;

    let isPopupOpen = false;

    function openPopup() {
        isPopupOpen = true;
    }

    function closePopup() {
        isPopupOpen = false;
    }

</script>
{#if args}
	<div class="fade-in bg-white space-y-3 px-4 py-2 rounded-lg shadow m-5">
		<button class="gird grid-cols-1 gap-4 w-full"
		        on:click
		        type="button" q
		        data-te-collapse-init
		        data-te-ripple-init
		        data-te-ripple-color="light"
		        href="#collapseExample{index + 1}"
		        role="button"
		        aria-expanded="false"
		        aria-controls="collapseExample{index + 1}"
		>
			<div class="">
				<div class="flex items-center space-x-2 text-sm">
					<div class="p-2">
						<span class="text-blue-500 font-bold">#{index + 1}</span> {args.songModeType} -
						{#if args.songDifficulty === "ExpertPlus"}
							<span
									class="p-1.5 text-white text-xs font-medium uppercase tracking-wider text-green-800 bg-purple-700 rounded-lg">Expert Plus</span>
						{:else if args.songDifficulty === "Expert"}
							<span
									class="p-1.5 text-white text-xs font-medium uppercase tracking-wider text-green-800 bg-red-500 rounded-lg">{args.songDifficulty}</span>
						{:else if args.songDifficulty === "Hard"}
							<span
									class="p-1.5 text-white text-xs font-medium uppercase tracking-wider text-green-800 bg-orange-400 rounded-lg">{args.songDifficulty}</span>
						{:else if args.songDifficulty === "Normal"}
							<span
									class="p-1.5 text-white text-xs font-medium uppercase tracking-wider text-green-800 bg-sky-400 rounded-lg">{args.songDifficulty}</span>
						{:else}
							<span
									class="p-1.5 text-white text-xs font-medium uppercase tracking-wider text-green-800 bg-green-700 rounded-lg">{args.songDifficulty}</span>
						{/if}
					</div>
					<button
							class="p-1 text-xs text-white font-medium uppercase tracking-wider text-green-800 bg-danger-600 rounded-lg"
							on:click={openPopup}>
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						     stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round"
							      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>
						</svg>
					</button>
					<a class="p-1 text-xs flex font-medium uppercase tracking-wider text-white bg-pink-600 rounded-lg"
					   href="https://beatsaver.com/maps/{args.songId}" target="_blank">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
						     viewBox="0 0 200 200" version="1.1">
							<g fill="none" stroke="#ffffff" stroke-width="10">
								<path d="M 100,7 189,47 100,87 12,47 Z" stroke-linejoin="round"></path>
								<path d="M 189,47 189,155 100,196 12,155 12,47" stroke-linejoin="round"></path>
								<path d="M 100,87 100,196" stroke-linejoin="round"></path>
								<path d="M 26,77 85,106 53,130 Z" stroke-linejoin="round"></path>
							</g>
						</svg>
						<!--                        <span class="flex items-center">{args.songId}</span>-->
					</a>
					<a class="p-1 text-xs flex font-medium uppercase tracking-wider text-white bg-blue-500 rounded-lg"
					   href="beatsaver://{args.songId}">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						     stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round"
							      d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
						</svg>
					</a>
					<a class="p-1 text-xs flex font-medium uppercase tracking-wider text-white bg-yellow-500 rounded-lg"
					   href="{args.downloadUrl}">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						     stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round"
							      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
						</svg>

					</a>
					{#if isPopupOpen}
						<div class="overlay" on:click={closePopup}>
							<PopupContent songId={args.songId} songDifficulty={args.songDifficulty}
							              songModeType={args.songModeType} onClose={closePopup}/>
						</div>
					{/if}
				</div>
				<div class="flex  space-x-2 text-sm w-full ">
					<div class="flex w-full">
						<img src="{args.coverUrl}" alt="노래사진" class="w-1/3 max-w-imageFull bg-cover h-auto">
						<div class="w-1/3 px-5 flex-col basis-4/6">
							<p class="text-2xl h-18 overflow-hidden line-clamp-3 sm:text-3xl ">{args.songName}</p>
							<p class="text-lg line-clamp-1">Mapper: {args.uploaderName}
							</p>
						</div>
						<div class="hidden flex-col w-1/3 2sm:block">
							<div>1등사진 - 이름</div>
							<div>2등사진 - 이름</div>
							<div>3등사진 - 이름</div>
						</div>
					</div>
				</div>
			</div>
		</button>
	</div>
{/if}