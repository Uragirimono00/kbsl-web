<script lang="ts">
    import axios from 'axios';
    import {apiBaseUrl} from "$lib/app/stores.ts";
    import {onDestroy, onMount} from 'svelte'
    import { page } from '$app/stores';
    import {redirect} from "@sveltejs/kit";
    import {goto} from "$app/navigation";
    import { user } from "$lib/app/stores.ts";

    onMount(async () => {
        const code = await $page.url.searchParams.get("code");

        if (!code){
            console.log('에러가 발생했습니다.');
            goto('/');
        }

        // console.log(code);

        try {
            // Get the authentication object using the user's code
            const AuthRes = await axios.get(`${$apiBaseUrl}/auth/discord?code=${code.toString()}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            if(AuthRes.data.data.userSeq === 4){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                alert("인증에 실패하였습니다.")
                goto('/');
            }

            // console.log(AuthRes.data.data);

            // Optionally, you can upsert the user in the DB here

            // Redirect the user and set the session cookie
            const accessToken = AuthRes.data.data.accessToken;
            const refreshToken = AuthRes.data.data.refreshToken;

            // 데이터를 localstorage에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);


            const unsubscribe = user.subscribe((value) => {
                console.log('user changed:', value);
            });

            console.log(AuthRes.data);

            user.update((user) => {
                user.name = AuthRes.data.data.userName;
                user.seq = AuthRes.data.data.userSeq;
                return user;
            });

            onDestroy(() => {
                unsubscribe();
            });

            console.log($user)

            goto('/');
        } catch (error) {
            console.log(error);
            // goto('/');
        }


    })


</script>
<div id="loading-spinner" class="flex bg-zinc-900 justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
    <div class="px-3 text-white">로그인 중입니다~!!</div>
</div>

<style>
    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .animate-spin {
        animation: spin 2s linear infinite;
    }
</style>