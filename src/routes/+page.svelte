<script>
    import League from "$lib/components/League.svelte";
    import { userdata } from "$lib/app/stores.ts";
    console.log($userdata)

    export let data;

    const leagueCount = 3;
</script>

<div aria-label="Main" class="bg-zinc-800">
    <div aria-label="Welcome">
        <video class="brightness-50 w-full" src="/main.mp4" muted autoplay loop></video>
        <div class="text-white relative flex justify-center">
            <span class="text-3xl text-center py-5">
                <span class="text-6xl">Welcome <span class="text-blue-500">KB</span><span class="text-red-500">SL</span>!!<br></span>
                안녕하세요! 세이버 여러분!<br>
                Kyaru Beat Saber League 홈페이지에 오신것을 환영합니다!<br>
                통칭 <a href="/about" class="text-blue-500">KBSL이란?</a><br>
            </span>
        </div>
    </div>
    <!--리그 컴포넌트-->
    <League count={leagueCount} />
</div>

<style>

</style>