<script>
    import { userdata } from "$lib/app/stores.ts";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    onMount(async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        userdata.update(userData => ({ ...userData, isLogin: false }));
        goto("/")
    })
</script>
