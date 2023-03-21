<script>
    import {onMount} from "svelte";
    import {apiBaseUrl, user} from "$lib/app/stores.ts";
    import {goto} from "$app/navigation";
    import axios from "axios";

    function loginWithSteam() {
        // Set the OpenID endpoint URL
        const openIdUrl = 'https://steamcommunity.com/openid/login';

        // Create a new form element
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', openIdUrl);

        // Add the required OpenID fields to the form
        const input1 = document.createElement('input');
        input1.setAttribute('type', 'hidden');
        input1.setAttribute('name', 'openid.mode');
        input1.setAttribute('value', 'checkid_setup');
        form.appendChild(input1);

        const input2 = document.createElement('input');
        input2.setAttribute('type', 'hidden');
        input2.setAttribute('name', 'openid.ns');
        input2.setAttribute('value', 'http://specs.openid.net/auth/2.0');
        form.appendChild(input2);

        const input3 = document.createElement('input');
        input3.setAttribute('type', 'hidden');
        input3.setAttribute('name', 'openid.identity');
        input3.setAttribute('value', 'http://specs.openid.net/auth/2.0/identifier_select');
        form.appendChild(input3);

        const input4 = document.createElement('input');
        input4.setAttribute('type', 'hidden');
        input4.setAttribute('name', 'openid.claimed_id');
        input4.setAttribute('value', 'http://specs.openid.net/auth/2.0/identifier_select');
        form.appendChild(input4);

        const input5 = document.createElement('input');
        input5.setAttribute('type', 'hidden');
        input5.setAttribute('name', 'openid.return_to');
        input5.setAttribute('value', 'https://www.kbsl.dev/user/auth/steam');
        form.appendChild(input5);

        // Submit the form
        document.body.appendChild(form);
        form.submit();
    }

    onMount(async () => {
        await import('tw-elements');
        console.log('tw-elements loaded');

        if ($user.seq === 0) {
            if (localStorage.getItem("accessToken") && $user.seq === 0) {
                console.log("user 재 조회");
                const response = await axios.get(`${$apiBaseUrl}/user/myinfo`, {
                    params: {
                        Authorization: `${localStorage.getItem("accessToken")}`
                    }
                });
                user.update((user) => {
                    user.name = response.data.data.userName;
                    user.seq = response.data.data.seq;
                    return user;
                });
            }
            if ($user.seq === 0) {
                alert("로그인이 필요한 페이지입니다!!");
                goto("/");
            }
        }
    });

    const unsubscribe = user.subscribe((value) => {
        console.log('user changed:', value);
    });

    let steamId = '';


    async function saveData() {
        const url = `${$apiBaseUrl}/user/beatleader/${$user.seq}`;
        let steamId = document.getElementById('steamId').value;
        const regex = /(\d{17})/; // matches 17 digits

        if (steamId.includes("https" || "beatleader" || "scoresaber")) {
            steamId = steamId.match(regex)[1]
        }

        if (steamId.length !== 17) {
            alert("조회된 스팀 유저가 없습니다.");
            return;
        }

        const requestBody = {
            steamId: steamId
        };

        try {
            const response = await axios.put(url, requestBody, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                },
            });
        } catch (e) {
            // 에러 보여줌
            alert(e.response.data.message);
        }

    }


</script>
<div>
    <div class="flex justify-center bg-zinc-900 text-white break-keep">
        <div class="block max-w-2xl rounded-lg bg-zinc-800 p-6 shadow-lg my-10">
            <h5 class="mb-2 text-2xl font-medium leading-tight">
                What is KBSL ?
            </h5>
            <p class="mb-4">
                KBSL은 한국 비트세이버 유저들을 위한 비트세이버 리더보드입니다.
            </p>
            <p class="mb-4">
                공식/비공식 리그를 진행하며, 매번 새로운 리그를 생성됩니다!!<br>
                리그를 통해 자신이 얼마나 성장하였는지, 여러 유저와 정의로운 결투를 해봅시다!!
            </p>
            <p>
                건투를 빕니다! 그럼 아래에 Beatleader ID를 입력하거나 스팀으로 로그인 해주세요!!
            </p>
        </div>
    </div>
<!--    여기부터 정보 입력 폼   -->
    <div class="flex justify-center bg-zinc-900 text-white break-keep">
        <div class="block max-w-2xl rounded-lg bg-zinc-800 p-6 shadow-lg my-10">
            <h5 class="mb-2 text-2xl font-medium leading-tight">
                점수 등록을 위한 BeatLeader ID 입력
            </h5>
            <p class="mb-4 text-base ">
                본인만 추가해주세요. (비트리더 계정은 단 1개만 KBSL서버에 등록이 가능합니다.)<br>
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
                            id="steamId"
                            bind:value={steamId}
                            placeholder="Beatleader"/>
                    <label
                            for="steamId"
                            class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-blue-500 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                    >Beatleader Profile URL
                    </label>
                </div>
            </div>
            <div class="flex text-sm">
                <button
                        on:click={saveData}
                        class="rounded bg-white px-6 pt-2 pb-1.5 uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-gray-300 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-gray-300 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                    <span>저장</span>
                </button>
                <button
                        on:click={loginWithSteam}
                        class="mx-3 rounded bg-white px-6 pt-2 pb-1.5 uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-gray-300 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-gray-300 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-gray-300 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        data-te-ripple-init
                        data-te-ripple-color="light">
                    <span class="flex items-center ">
                                            <svg class="w-6" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 333333 333333"
                                                 shape-rendering="geometricPrecision"
                                                 text-rendering="geometricPrecision" image-rendering="optimizeQuality"
                                                 fill-rule="evenodd" clip-rule="evenodd">
                        <path d="M225 162617l73189 29853c9154-5256 19765-8262 31078-8262 1987 0 3951 94 5890 275l52891-75293v-53c0-23479 9518-44736 24906-60124s36645-24906 60124-24906 44736 9518 60124 24906 24906 36646 24906 60124c0 23479-9518 44736-24906 60124s-36645 24906-60124 24906c-299 0-597-3-895-6l-80753 59150c-1534 14627-8112 27754-17964 37606-11312 11312-26939 18309-44200 18309s-32887-6997-44200-18309c-8257-8257-14215-18813-16831-30626L-1 242906l225-80289zm95341 38889l19367 7899c40021 16324 22200 80460-26977 68683l-24105-9642c2148 4009 4870 7663 8059 10852 8337 8337 19857 13494 32581 13494s24244-5157 32581-13494 13494-19857 13494-32581-5157-24244-13494-32581-19856-13494-32581-13494c-3054 0-6038 298-8925 865zM247997 66956c23541 0 42624 19084 42624 42624 0 23541-19084 42624-42624 42624-23541 0-42624-19083-42624-42624s19083-42624 42624-42624zm39709 2778c-10083-10083-24015-16320-39404-16320s-29320 6237-39404 16320c-10083 10083-16320 24015-16320 39404s6237 29320 16320 39404c10083 10083 24015 16320 39404 16320s29321-6237 39404-16320 16320-24015 16320-39404-6237-29321-16320-39404z"></path>
                    </svg>
                        <span class="px-2">Login with Steam</span>
                    </span>
                </button>
            </div>
        </div>
    </div>
</div>
