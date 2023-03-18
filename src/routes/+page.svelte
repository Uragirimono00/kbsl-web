<script>
    // import { userdata } from "$lib/app/stores.ts";
    // console.log("isLogin: " + $userdata.isLogin)

    export let data;

</script>

<div aria-label="Main" class="bg-zinc-800">

    <div aria-label="Welcome">
        <video class="brightness-50 w-full" src="../../src/lib/assets/images/main.mp4" muted autoplay loop></video>
        <div class="text-white relative flex justify-center">
            <span class="text-3xl text-center py-5">
                <span class="text-6xl">Welcome <span class="text-blue-500">KB</span><span class="text-red-500">SL</span>!!<br></span>
                안녕하세요! 세이버 여러분!<br>
                Kyaru Beat Saber League 홈페이지에 오신것을 환영합니다!<br>
                통칭 <a href="/about" class="text-blue-500">KBSL이란?</a><br>
            </span>
        </div>
    </div>
    <!-- todo: 근데 이거 /league 에 있는 내용 그대로 들고오는건데 이렇게 관리해야하는거임?????? 컴포넌트로 빼서 관리해도 되럭같은 ㅇ낻ㅁㄴ ㅓㅏㅠㄷㅎㅇㅁ나ㅑ ㅎ-->
    <div aria-label="Now League">
        <div aria-label="Main" class="bg-zinc-800">
            {#each data.data.content as {...args} }
                <a href="/league/detail?{args.seq}">
                    <div class="gird grid-cols-1 gap-4 p-4">
                        <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                            <div class="flex items-center space-x-2 text-sm">
                                <div><span class="text-blue-500 font-bold">#{args.seq}</span> {args.leagueStartDtime}
                                    ~ {args.leagueEndDtime}</div>
                                <div class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg">
                                    {args.leagueStatus}
                                </div>
                            </div>
                            <div class="flex items-center space-x-2 text-sm">
                                <div class="flex">
                                    <img src="{args.imageUrl}" alt="리그사진">
                                    <div class="px-5 flex-col">
                                        <p class="text-3xl">{args.leagueName}</p>
                                        <p>{args.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</div>

<style>

</style>