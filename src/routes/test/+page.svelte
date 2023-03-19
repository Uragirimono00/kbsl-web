<script>
    import { onMount } from 'svelte';

    // 브라우저 종료감지하는거

    onMount(() => {
        window.addEventListener('unload', handleUnload);
    });

    function handleUnload() {
        console.log("test")
        navigator.sendBeacon('http://localhost:8090/league', JSON.stringify({ message: '브라우저가 종료됩니다.' }));
    }

</script>