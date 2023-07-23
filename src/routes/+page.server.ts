import { getScreenshot } from "$lib";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
    
    return {
        props: {
            x : getScreenshot()
        }
    };
}) satisfies PageServerLoad;