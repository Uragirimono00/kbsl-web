<script>
    import ActiveLink from './ActiveLink.svelte';
    import {apiBaseUrl} from "$lib/app/stores.ts";
    import User from "carbon-icons-svelte/lib/User.svelte";
    import {PUBLIC_DISCORD_AUTH_URI} from '$env/static/public';
    import {onMount} from "svelte";
    import {user} from "$lib/app/stores.ts";
    import axios from "axios";
    import {goto} from "$app/navigation";

    const unsubscribe = user.subscribe((value) => {
        console.log('user changed:', value);
    });

    onMount(async () => {
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
    })
    function logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        user.update((user) => {
            user.name = "";
            user.seq = 0;
            return user;
        });
        goto("/")
    }

    function login() {
        goto(PUBLIC_DISCORD_AUTH_URI);
    }

    function addUser() {
        goto(PUBLIC_DISCORD_AUTH_URI);
    }

    let links = [
        {
            href: '/league',
            title: '🗡️League'
        },
        {
            href: '/user/beatleader',
            title: '💎AddUser',
        }
    ];

</script>

<nav aria-label="Site Nav" class="flex items-center justify-between py-3 bg-zinc-800 px-5">
    <a href="/" class="inline-flex items-center justify-center gap-3">
        <span class="sr-only">Logo</span>
        <img class="w-20" src="/logo.svg" alt="로고"/>
        <!--        <span class="text-lg text-white font-semibold">KBSL</span>-->
    </a>
    {#each links as {href, title}}
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <ActiveLink
                {href}
                baseClass="px-3 py-2 rounded-md text-1.5xl font-medium "
                activeClass="bg-gray-200 bg-gray-900 text-white "
                defaultClass="text-white hover:text-blue-500 "
        >
            {title}
        </ActiveLink>
    {/each}
    {#if $user.seq > 0}
        <button
                on:click={() => logout()}
                class="inline-flex justify-center items-center gap-3 rounded-full bg-gray-100 px-4 py-1.5">
            <User size={16} class="text-gray-700"/>
            <span class="">로그아웃</span>
        </button>
    {:else}
        <button
                on:click={() => login()}
                class="inline-flex justify-center items-center gap-3 rounded-full bg-gray-100 px-4 py-1.5">
            <User size={16} class="text-gray-700"/>
            <span class="">로그인</span>
        </button>

    {/if}


</nav>