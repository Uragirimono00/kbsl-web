<script>
    import { onMount } from 'svelte';
    import PopupContent from '$lib/components/PopupContent.svelte';
    import axios from "axios";
    export let songSeq;


    let res;

    async function loadData() {
        res = await axios.get('https://api.kbsl.dev/score', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            },
            params: {
                songSeq: songSeq,
                page: 0,
                elementCnt: 30
            }
        });
    }

    onMount(loadData);

    //팝업
    let isPopupOpen = false;
    let message = 'Hello, world!';

    function openPopup() {
        isPopupOpen = true;
    }

    function closePopup() {
        isPopupOpen = false;
    }
</script>
{#if res}
    <div>
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
                    <td class="flex items-center px-6 py-4"><img class="w-10 rounded-xl" src="{args.user.imageUrl}" alt="profile">&nbsp{args.user.username}</td>
                    <td class="px-6 py-4">{(args.accuracy*100).toFixed(3)}%</td>
                    <td class="px-6 py-4">{args.modifiedScore}점</td>
                    <td class="px-6 py-4">
                        <button on:click={openPopup}>
                            <img class="w-10" src="/replay.gif" alt="리플레이">
                        </button>
                        {#if isPopupOpen}
                            <div class="overlay" on:click={closePopup}>
                                <PopupContent message={args.scoreSeq} onClose={closePopup}/>
                            </div>
                        {/if}
                    </td>
                    <td class="px-6 py-4">{args.comment}</td>
                </tr>
                {/each}
            </table>
        </div>
    </div>
{/if}
