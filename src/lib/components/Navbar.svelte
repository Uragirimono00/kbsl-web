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
		if ($user.seq === 3){
			console.log("null data");
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
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
            href: '/user/register',
            title: '💎AddUser',
        }
    ];

</script>


<nav class="bg-zinc-800 px-2 2sm:px-4 py-2.5 relative w-full z-20 top-0 left-0">
	<div class="container flex flex-wrap items-center justify-between mx-auto">
		<a href="/" class="flex items-center">
			<img src="/logo.svg" class="h-6 mr-3 2sm:h-9" alt="Flowbite Logo">
		</a>
		<div class="flex 2sm:order-2">
			{#if $user.seq > 0}
				<button
						on:click={() => logout()}
						class="inline-flex justify-center items-center gap-2 rounded-full px-4 py-1.5">
					<User size={16} class="text-white"/>
					<span class="text-white">로그아웃</span>
				</button>
			{:else}
				<button
						on:click={() => login()}
						class="inline-flex justify-center items-center gap-2 rounded-full px-4 py-1.5">
					<User size={16} class="text-white"/>
					<span class="text-white">로그인</span>
				</button>
			{/if}
			<div class="flex justify-center">
				<div>
					<div class="relative" data-te-dropdown-ref>
						<button
								class="flex items-center whitespace-nowrap rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white 2sm:hidden transition duration-150 ease-in-out motion-reduce:transition-none"
								type="button"
								id="dropdownMenuButton1"
								data-te-dropdown-toggle-ref
								aria-expanded="false"
								data-te-ripple-init
								data-te-ripple-color="light">
							<svg class="w-6 h-6 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
							     xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd"
								      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								      clip-rule="evenodd"></path>
							</svg>
						</button>
						<ul
								class="absolute z-[1000]  float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
								aria-labelledby="dropdownMenuButton1"
								data-te-dropdown-menu-ref>
                            {#each links as {href, title}}
                                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                                <li class="2sm:hidden">
                                    <ActiveLink
                                            {href}
                                            baseClass="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400"
                                            activeClass="text-neutral-800 no-underline "
                                            defaultClass=""
                                    >
                                        {title}
                                    </ActiveLink>
                                </li>
                            {/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="items-center justify-between hidden w-full 2sm:flex 2sm:w-auto 2sm:order-1" id="navbar-sticky">
			<ul class="flex flex-col p-4 mt-4 border rounded-lg 2sm:flex-row 2sm:space-x-8 2sm:mt-0 2sm:text-sm 2sm:font-medium 2sm:border-0 ">
				{#each links as {href, title}}
					<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
					<li>
						<ActiveLink
								{href}
								baseClass="px-3 py-2 rounded-md text-1xl font-medium "
								activeClass="bg-gray-200 bg-gray-900 text-white "
								defaultClass="text-white hover:text-blue-500 "
						>
							{title}
						</ActiveLink>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>