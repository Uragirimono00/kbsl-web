<script>

    import axios from "axios";
    import {onMount} from "svelte";
    import {apiBaseUrl} from "$lib/app/stores.ts";

    export let leagueCount;

    let res;

    async function loadData() {
        res = await axios.get(`${$apiBaseUrl}/league`, {
            headers: {
            },
            params: {
                page: 0,
                elementCnt: leagueCount
            }
        });
    }

    onMount(loadData);

</script>
{#if res}
    <div aria-label="Now League">
        <div aria-label="Main" class="bg-zinc-800">
            {#each res.data.data.content as {...args} }
                <a href="/league/detail?{args.seq}">
                    <div class="gird grid-cols-1 gap-4 p-4">
                        <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                            <div class="flex items-center space-x-2 text-sm">
                                <div><span class="text-blue-500 font-bold">#{args.seq}</span> {args.leagueStartDtime}
                                    ~ {args.leagueEndDtime}</div>
                                <div class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg">
                                    {args.leagueStatus}
                                </div>
                            </div>
                            <div class="flex items-center space-x-2 text-sm">
                                <div class="flex">
                                    <img src="{args.imageUrl}" alt="리그사진">
                                    <div class="px-5 flex-col">
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




