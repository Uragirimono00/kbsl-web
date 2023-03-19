<script>
    import {onMount} from "svelte";
    import {userdata} from "$lib/app/stores.ts";
    import {goto} from "$app/navigation";
    import axios from "axios";

    let beatleaderId = '';

    if ($userdata.userSeq === 0) {
        alert("로그인이 필요한 페이지입니다.");
        goto("/");
    }
    const API_BASE_URL = 'https://api.kbsl.dev';

    async function saveData() {
        const url = `${API_BASE_URL}/user/${$userdata.userSeq}`;
        const data = {beatleader: beatleaderId};
        const response = await axios.put(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
            data
        });
        console.log(beatleaderId);
        console.log(response.data);
    }

    onMount(async () => {
        await import('tw-elements');
    })

</script>
<div>

    <form on:submit|preventDefault={saveData}>
        <div class="flex justify-center bg-zinc-900 text-white break-keep">
            <div class="block max-w-2xl rounded-lg bg-zinc-800 p-6 shadow-lg my-10">
                <h5
                        class="mb-2 text-xl font-medium leading-tight">
                    점수 등록을 위한 BeatLeader ID 입력
                </h5>
                <p class="mb-4 text-base ">
                    본인만 추가해주세요. (비트리더 계정은 단 1개만 KBSL서버에 등록이 가능합니다.)
                    KBSL은 현재 BeatLeader 데이터를 사용함으로 BeatLeader 계정이 있어야 합니다.
                </p>
                <p>
                    예시
                </p>
                <p>
                    https://www.beatleader.xyz/u/76561199257569878 또는
                </p>
                <p>
                    76561199257569878
                </p>
                <div class="flex justify-center my-3 rounded border-solid ">
                    <div class="relative mb-3 w-full" data-te-input-wrapper-init>
                        <input
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="beatLeaderInput1"
                                bind:value={beatleaderId}
                                placeholder="Beatleader"/>
                        <label
                                for="beatLeaderInput1"
                                class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-blue-500 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                        >Beatleader Profile URL
                        </label>
                    </div>
                </div>
                <button
                        type="submit"
                        class="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                    저장
                </button>
            </div>
        </div>
    </form>
</div>
