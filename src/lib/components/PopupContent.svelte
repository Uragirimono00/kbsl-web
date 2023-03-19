<script>
    export let songId;
    export let songDifficulty;
    export let songModeType;
    export let onClose;

    function closePopup() {
        onClose();
    }

</script>

<div class="popup">
    {#if songId.length === 5}
        <iframe class="w-full h-full" src="https://skystudioapps.com/bs-viewer/?id={songId}&diffName={songDifficulty}&charName={songModeType}"></iframe>
    {:else}
        <iframe class="w-full h-full" src="https://replay.beatleader.xyz/?scoreId={songId}"></iframe>
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