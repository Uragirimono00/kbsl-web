<script lang="ts">
    import ActiveLink from './ActiveLink.svelte';
    import User from "carbon-icons-svelte/lib/User.svelte";
    import {PUBLIC_DISCORD_AUTH_URI} from '$env/static/public';
    let links = [
        {
            href: 'https://github.com/kairos7578/kbsl-web',
            title: 'Source',
            target: '_blank'
        },
        {
            href: 'https://discord.gg/ef8XqzTpre',
            title: 'Discord',
            target: '_blank'
        },
        {
            href: 'https://twitter.com/lovekyaru',
            title: 'Twitter',
            target: '_blank'
        },
        {
            href: 'https://patreon.com/KyaruBeatSaberLeague',
            title: 'Patreon',
            target: '_blank'
        }
    ];
</script>

<footer aria-label="Site Footer" class="flex items-center justify-center bg-zinc-800 px-5">

    {#each links as { href, title, target }}
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <ActiveLink
                {href}
                baseClass="px-3 py-2 rounded-md text-1.5xl font-medium "
                activeClass="bg-gray-200 bg-gray-900 text-white "
                defaultClass="text-white hover:text-blue-300 "
                {target}
        >
            {title}
        </ActiveLink>
    {/each}

</footer>