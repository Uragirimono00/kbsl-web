<script>
    import League from "$lib/components/League.svelte";

    export let data;

    const leagueCount = 3;
    const leagueType = "TYPE_PROCESS";
</script>

<div aria-label="Main" class="fade-in">
	<div aria-label="Welcome" style="position: relative;">
		<video class="brightness-50 w-full" muted autoplay loop playsinline>
			<source src="/main.webm" type="video/webm">
			<source src="/main.mp4" type="video/mp4">
		</video>
		<div class="min-w-full text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <span class="text-lg py-5 2sm:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            <span class="flex w-full justify-center text-4xl 2sm:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8.5xl 2xl:text-9xl">Welcome&nbsp<span
		            class="text-red-600">KB</span><span class="text-blue-600">SL</span>!!<br></span>
            안녕하세요! 세이버 여러분!<br>
            Kyaru Beat Saber League<br>
            홈페이지에 오신것을 환영합니다!<br>
            통칭 <a href="/about" class="text-blue-500">KBSL이란?</a><br>
        </span>
		</div>
	</div>
	<!--리그 컴포넌트-->
	<League count={leagueCount} leagueStatusType={leagueType}/>
</div>
