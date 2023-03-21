<script>
    import {onMount} from "svelte";
    import { page } from '$app/stores';
    import axios from "axios";
    import {apiBaseUrl, user} from "$lib/app/stores.ts";
    import {goto} from "$app/navigation";

    onMount(async () => {
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


        const steamOpenIdUrl = await $page.url.searchParams.get("openid.claimed_id");

        let steamId = steamOpenIdUrl.match(/\d+/)[0];
        console.log(steamId);

        const url = `${$apiBaseUrl}/user/steam/${$user.seq}`;
        const regex = /(\d{17})/; // matches 17 digits

        if (steamId.includes("https" || "beatleader" || "scoresaber")) {
            steamId = steamId.match(regex)[1]
        }

        if (steamId.length !== 17) {
            alert("조회된 스팀 유저가 없습니다.");
            goto("/user/addUser")
            return;
        }

        const requestBody = {
            steamId: steamId
        };

        await axios.put(url, requestBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            },
        }).then(response => {
            alert("steamId가 등록되었습니다!");
            goto("/user/register");
        }).catch(error => {
            alert(error.response.data.message);
            goto("/user/register");
        })


        // const token_params = {
        //     "openid.assoc_handle": await $page.url.searchParams.get("openid.assoc_handle"),
        //     "openid.signed": await $page.url.searchParams.get("openid.signed"),
        //     "openid.sig": await $page.url.searchParams.get("openid.sig"),
        //     "openid.ns": "http://specs.openid.net/auth/2.0",
        //     "openid.mode": "check_authentication",
        // }
        // for (const val of await $page.url.searchParams.get("openid.signed").split(",")) {
        //     //@ts-ignore
        //     token_params[`openid.${val}`] = await $page.url.searchParams.get(`openid.${val}`);
        // }
        //
        // const token_url = new URL("https://steamcommunity.com/openid/login");
        // const token_url_params = new URLSearchParams(token_params);
        //
        // console.log(token_params)
        //
        // const user_result = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002?key=ECE9CF33C5E4DB373E9348F80C600093&steamids=76561199257569878`, {
        //         headers: {
        //             "Content-type": "application/x-www-form-urlencoded",
        //         }
        //     }
        // );
        // const json = await user_result.json();
        //
        // console.log(json)

        // const token_res = await axios.post('https://steamcommunity.com/openid/login', {
        //     headers: {
        //         "Accept-language": "en",
        //         "Content-type": "application/x-www-form-urlencoded",
        //         "Content-Length": `${token_url_params.toString().length}`
        //     },
        //     token_params
        // });
        //
        // const result = await token_res.text();

    })
</script>
<div id="loading-spinner" class="flex bg-zinc-900 justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    <div class="px-3 text-white">Steam ID 등록중입니다~!!</div>
</div>

<style>
    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .animate-spin {
        animation: spin 2s linear infinite;
    }
</style>