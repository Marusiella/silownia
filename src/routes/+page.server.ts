import { unlinkSync } from 'fs';
import { getScreenshot } from "$lib";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async () => {
    
    return {
        props: {
            x : getScreenshot()
        }
    };
}) satisfies PageServerLoad;

export const actions = {
    clearcache: async (x) => {
        // delete cache.js file
        try {
            unlinkSync("cache.json");
            return {
                props: {
                    x: "cache cleared"
                }
            }
            
        }catch(e) {
            return {
                props: {
                    error: e
                }
            }
        }

    }
}satisfies Actions;
