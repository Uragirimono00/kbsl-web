<script>

    import axios from "axios";
    import {onMount} from "svelte";
    import {apiBaseUrl} from "$lib/app/stores.ts";

    export let leagueCount;
    export let leagueStatusType;

    let res;

    async function loadData() {
        res = await axios.get(`${$apiBaseUrl}/league`, {
            headers: {},
            params: {
                page: 0,
                leagueStatusType: leagueStatusType,
                elementCnt: leagueCount
            }
        });
    }

    onMount(loadData);

</script>
{#if res}
	<div aria-label="Now League" class="fade-in">
		<div aria-label="Main">
			{#each res.data.data.content as {...args} }
				<a href="/league/detail?{args.seq}">
					<div class="gird grid-cols-1 gap-4 p-4">
						<div class="bg-white space-y-3 p-4 rounded-lg shadow">
							<div class="flex items-center space-x-2 text-sm">
								<div><span class="text-blue-500 font-bold">#{args.seq}</span> {args.leagueStartDtime.substring(0, 10)}
									~ {args.leagueEndDtime.substring(0, 10)}</div>
								{#if args.leagueStatus == "진행중"}
									<div
											class="w-14 p-1.5 text-center text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg">
										{args.leagueStatus}
									</div>
								{:else if args.leagueStatus == "대기중"}
									<div
											class="w-14 p-1.5 text-center text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg">
										{args.leagueStatus}
									</div>
								{:else if args.leagueStatus == "종료"}
									<div class="w-14 p-1.5 text-center  text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg">
										{args.leagueStatus}됨
									</div>
								{/if}
							</div>
							<div class="flex items-center space-x-2 text-sm">
								<div class="flex">
									<img class="w-14 h-14 sm:w-1/2 sm:h-1/2" src="{args.imageUrl}" alt="리그사진">
									<div class="px-5 flex-col w-full">
										<p class="text-2xl">{args.leagueName}</p>
										<p>{args.description}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
{/if}

<style>
    @media (max-width: 480px) {

    }
</style>