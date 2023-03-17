<script>
    export let data;

    data.data.content.forEach(element => console.log(element))
</script>
{#each data.data.content as {...args} }
    <li>{args.leagueName}</li>
    <li>{args.userName}</li>
{/each}
