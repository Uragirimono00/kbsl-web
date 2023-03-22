<script>
    export let text;
    export let className;

    $: text = text ? text : "로딩중입니다..!!";

</script>

<div id="loading-spinner" class="bg-white flex justify-center items-center {className}">
	<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-900"></div>
	<div class="px-3 text-zinc-900">{text}</div>
</div>

<style>
    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .animate-spin {
        animation: spin 2s linear infinite;
    }
</style>