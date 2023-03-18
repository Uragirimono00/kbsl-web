<script lang="ts">
    import axios from 'axios';
    import { onMount } from 'svelte'
    import { page } from '$app/stores';
    import {redirect} from "@sveltejs/kit";
    import {goto} from "$app/navigation";
    import { userdata } from "$lib/app/stores.ts";
    import { user } from "$lib/config";

    onMount(async () => {
        const code = await $page.url.searchParams.get("code");

        if (!code){
            console.log('에러가 발생했습니다.');
            goto('/');
        }

        console.log(code);

        try {
            // Get the authentication object using the user's code
            const AuthRes = await axios.get('http://52.79.222.211:8090/auth/discord?code=' + code.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            console.log(AuthRes.data.data);

            // Optionally, you can upsert the user in the DB here

            // Redirect the user and set the session cookie
            const accessToken = AuthRes.data.data.accessToken;
            const refreshToken = AuthRes.data.data.refreshToken;

            // 데이터를 localstorage에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            userdata.update(userData => ({ ...userData, isLogin: true }));

            goto('/');
        } catch (error) {
            console.log(error);
            goto('/');
        }


    })

</script>