<script>
    import {onMount} from 'svelte';
    import PopupContent from '$lib/components/PopupContent.svelte';
    import axios from "axios";
    import {apiBaseUrl} from "$lib/app/stores.ts";

    export let songSeq;
    export let leagueSeq;
    export let index;


    let res;

    async function loadData() {
        const loadingSpinner = document.createElement('div');
        loadingSpinner.setAttribute('id', 'loading-spinner');
        loadingSpinner.classList.add('flex', 'bg-white', 'justify-center', 'items-center', 'py-4');
        const spinner = document.createElement('div');
        spinner.classList.add('animate-spin', 'rounded-full', 'h-32', 'w-32', 'border-t-2', 'border-b-2', 'border-gray-900');
        loadingSpinner.appendChild(spinner);
        const parent = document.querySelector(`#collapseExample${index + 1}`);
        parent.appendChild(loadingSpinner);
        res = await axios.get(`${$apiBaseUrl}/league/${leagueSeq}/${songSeq}`, {
            headers: {},
            params: {
                page: 0,
                elementCnt: 30
            }
        });

        loadingSpinner.style.display = 'none';
    }

    onMount(() => {
        loadData();
    });

    //팝업
    let isPopupOpen = false;

    function openPopup() {
        isPopupOpen = true;
    }

    function closePopup() {
        isPopupOpen = false;
    }
</script>

<div class="score-list-{songSeq}">
	{#if res}
		<div>
			<table>
				<tr>
					<th>Rank</th>
					<th>Player</th>
					<th>Accuracy</th>
					<th>Score</th>
					<th>Replay</th>
					<th>Comment</th>
				</tr>
				{#each res.data.data.content as {...args}, index}
					<tr class="	">
						<td class="px-6 py-4">{index + 1}</td>
						<td class="flex items-center px-6 py-4">
							<img class="w-10 rounded-xl" src="{args.user.imageUrl}"
							     alt="profile">&nbsp{args.user.userName}
						</td>
						<td class="px-6 py-4">{(args.accuracy * 100).toFixed(3)}%</td>
						<td class="px-6 py-4">{args.modifiedScore}점</td>
						<td class="px-6 py-4">
							<button on:click={openPopup}>
								<img class="w-10" src="/replay.gif" alt="리플레이">
							</button>
							{#if isPopupOpen}
								<div class="overlay" on:click={closePopup}>
									<PopupContent songId={args.scoreSeq} onClose={closePopup}/>
								</div>
							{/if}
						</td>
						<td class="px-6 py-4">{args.comment}</td>
					</tr>
				{/each}
			</table>
		</div>
	{/if}
</div>

<style>
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .animate-spin {
        animation: spin 2s linear infinite;
    }
</style>