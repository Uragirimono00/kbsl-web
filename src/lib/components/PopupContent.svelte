<script>
    export let message;
    export let onClose;

    function closePopup() {
        onClose();
    }

    console.log(message.length)
</script>

<div class="popup">
    {#if message.length === 5}
        <iframe class="w-full h-full" src="https://skystudioapps.com/bs-viewer/?id={message}"></iframe>
    {:else}
        <iframe class="w-full h-full" src="https://replay.beatleader.xyz/?scoreId={message}"></iframe>
    {/if}
        </div>

<style>
    .popup {
        width: 800px;
        height: 480px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>