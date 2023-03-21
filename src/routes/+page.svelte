<script>
    import League from "$lib/components/League.svelte";

    export let data;

    const leagueCount = 3;
    const leagueType = "TYPE_PROCESS";
</script>

<div aria-label="Main">
    <div aria-label="Welcome" style="position: relative;">
        <video class="brightness-50 w-full" muted autoplay loop playsinline>
            <source src="/main.webm" type="video/webm">
            <source src="/main.mp4" type="video/mp4">
        </video>
        <div class="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span class="text-xl py-5 sm:text-2xl md:text-3xl lg:text-4xl xl:text-4.5xl">
            <span class="text-4xl sm:text-5xl md:text-5.5xl lg:text-7xl xl:text-7.5xl 2xl:text-8xl">Welcome <span class="text-red-600">KB</span><span class="text-blue-600">SL</span>!!<br></span>
            안녕하세요! 세이버 여러분!<br>
            Kyaru Beat Saber League<br>
            홈페이지에 오신것을 환영합니다!<br>
            통칭 <a href="/about" class="text-blue-500">KBSL이란?</a><br>
        </span>
        </div>
    </div>
    <!--리그 컴포넌트-->
    <League count={leagueCount} leagueStatusType={leagueType} />
</div>

<style>

</style>