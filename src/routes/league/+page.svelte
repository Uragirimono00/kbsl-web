<script>
    import League from "$lib/components/League.svelte";

    const leagueCount = 10;
    const leagueType = "TYPE_ALL";


</script>
<div aria-label="Main">

    <!--리그 컴포넌트-->
    <League count={leagueCount} leagueStatusType={leagueType} />

</div>
