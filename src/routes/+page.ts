import axios from "axios";

export async function load({ fetch }){
    let res = await axios.get('http://52.79.222.211:8090/league', {
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
