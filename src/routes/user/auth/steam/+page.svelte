<script>
    import {onMount} from "svelte";
    import {page} from "$app/stores";

    function loginWithSteam() {
        // Set the OpenID endpoint URL
        const openIdUrl = 'https://steamcommunity.com/openid/login';

        // Create a new form element
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', openIdUrl);

        // Add the required OpenID fields to the form
        const input1 = document.createElement('input');
        input1.setAttribute('type', 'hidden');
        input1.setAttribute('name', 'openid.mode');
        input1.setAttribute('value', 'checkid_setup');
        form.appendChild(input1);

        const input2 = document.createElement('input');
        input2.setAttribute('type', 'hidden');
        input2.setAttribute('name', 'openid.ns');
        input2.setAttribute('value', 'http://specs.openid.net/auth/2.0');
        form.appendChild(input2);

        const input3 = document.createElement('input');
        input3.setAttribute('type', 'hidden');
        input3.setAttribute('name', 'openid.identity');
        input3.setAttribute('value', 'http://specs.openid.net/auth/2.0/identifier_select');
        form.appendChild(input3);

        const input4 = document.createElement('input');
        input4.setAttribute('type', 'hidden');
        input4.setAttribute('name', 'openid.claimed_id');
        input4.setAttribute('value', 'http://specs.openid.net/auth/2.0/identifier_select');
        form.appendChild(input4);

        const input5 = document.createElement('input');
        input5.setAttribute('type', 'hidden');
        input5.setAttribute('name', 'openid.return_to');
        input5.setAttribute('value', 'https://www.kbsl.dev/user/auth/steam');
        form.appendChild(input5);

        // Submit the form
        document.body.appendChild(form);
        form.submit();
    }
    onMount(async () => {
        const steamOpenIdUrl = await $page.url.searchParams.get("openid.claimed_id");
        const steamId = steamOpenIdUrl.match(/\d+/)[0];
        console.log(steamId);

        const token_params = {
            "openid.assoc_handle": await $page.url.searchParams.get("openid.assoc_handle"),
            "openid.signed": await $page.url.searchParams.get("openid.signed"),
            "openid.sig": await $page.url.searchParams.get("openid.sig"),
            "openid.ns": "http://specs.openid.net/auth/2.0",
            "openid.mode": "check_authentication",
        }
        for (const val of await $page.url.searchParams.get("openid.signed").split(",")) {
            //@ts-ignore
            token_params[`openid.${val}`] = await $page.url.searchParams.get(`openid.${val}`);
        }

        const token_url = new URL("https://steamcommunity.com/openid/login");
        const token_url_params = new URLSearchParams(token_params);

        const token_res = await fetch(token_url, {
            method: "POST",
            headers: {
                "Accept-language": "en\r\n",
                "Content-type": "application/x-www-form-urlencoded\r\n",
                "Content-Length": `${token_url_params.toString().length}\r\n`,
                "Access-Control-Allow-Origin": "*"
            },
            body: token_url_params.toString(),
        });

        const result = await token_res.text();

        console.log(token_params);
    })
</script>

<button on:click={loginWithSteam}>Log in with Steam</button>