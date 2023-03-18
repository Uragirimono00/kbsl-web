import axios from "axios";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    // NOTE: fetch was passed in as a parameter to this function
    const param = url.search.replace("?","");
    let res = await axios.get('http://52.79.222.211:8090/league/' + param, {
    });

    return res.data.data;
}
