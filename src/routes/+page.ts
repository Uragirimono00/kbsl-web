import axios from "axios";

export async function load({ fetch }){
    let res = await axios.get('https://api.kbsl.dev/league', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            page:0,
            elementCnt:3
        }
    });

    return res.data;
}
