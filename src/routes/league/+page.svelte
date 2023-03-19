<script>
    import League from "$lib/components/League.svelte";

    const leagueCount = 10;
</script>
<div aria-label="Main" class="bg-zinc-800">

    <!--리그 컴포넌트-->
    <League count={leagueCount} />

</div>
