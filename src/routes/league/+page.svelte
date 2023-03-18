<script>
    export let data;
</script>
<div aria-label="Main" class="bg-zinc-800">

    {#each data.data.content as {...args} }
        <a href="/league/detail?{args.seq}">
            <div class="gird grid-cols-1 gap-4 m-4">
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
                                <p class="text-3xl">{args.leagueName}</p>
                                <p>{args.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    {/each}

</div>
