<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { beforeNavigate } from "$app/navigation";
    import { metadata } from "$lib/app/stores.ts";
    import { site } from "$lib/config";
    $: title = $metadata.title ? $metadata.title + " | " + site.name : site.name;
    $: description = $metadata.description ?? site.description;
    // reset metadata on navigation so that the new page inherits nothing from the old page
    beforeNavigate(() => {
        $metadata = {};
    });
</script>
<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content="" />
    <meta name="copyright" content="" />
    <meta name="generator" content="svelte" />
    <meta name="og:title" content="" />
    <meta name="twitter:title" content="" />
    <meta name="og:description" content="" />
    <meta name="twitter:description" content="" />
    <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
    />
    <!-- <meta property="og:image" content="%svelte.assets%/logo.png" /> -->
</svelte:head>

<div class="min-h-screen bg-zinc-900">
    <Navbar />
    <slot />
    <Footer />
</div>