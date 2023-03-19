<script>
    import {onMount} from "svelte";
    import Score from "$lib/components/Score.svelte";
    import PopupContent from '$lib/components/PopupContent.svelte';
    import LeagueSong from "$lib/components/LeagueSong.svelte";

    onMount(async () => {
        await import('tw-elements');

        const clickElements = document.querySelectorAll('.click');
        clickElements.forEach((clickElement, index) => {
            clickElement.addEventListener('click', () => {
                const collapseElement = document.querySelector(`#collapseExample${index + 1}`);
                const collapseChildElement = collapseElement.querySelector('.rounded-lg');

                // 이미 ScoreComponent가 생성되어 있는지 체크합니다.
                if (collapseElement.querySelector(`.score-list${index + 1}`) !== null) {
                    collapseElement.classList.remove('hidden');
                    return;
                }

                const scoreElement = document.createElement('div');
                scoreElement.classList.add(`score-list${index + 1}`);

                // ScoreComponent를 생성하고 scoreElement에 추가합니다.
                const scoreComponent = new Score({
                    target: scoreElement,
                    props: {
                        songSeq: data.songsList[index].seq,
                        index: index
                    }
                });

                // scoreElement를 collapseElement에 추가하고, 클래스를 변경합니다.
                collapseChildElement.appendChild(scoreElement);
                collapseElement.classList.remove('hidden');
            });
        });
    });

    export let data;
</script>
<!--todo: 해당 리그의 포함되어 있는 곡들이 드롭다운 형태로 나오게 한뒤 클릭시 해당 곡의 점수를 보여줌.-->
<div aria-label="Main" class="bg-zinc-800">
    {#each data.songsList as {...args}, index }
        <!--리그 노래 리스트 컴포넌트-->
        <div class="click">
            <LeagueSong args={args} index = {index} />
        </div>
        <div class="!visible hidden" id="collapseExample{index + 1}" data-te-collapse-item>
            <div class="rounded-lg bg-white p-6 shadow-lg">
                <!--점수 컴포넌트-->
            </div>
        </div>
    {/each}
</div>