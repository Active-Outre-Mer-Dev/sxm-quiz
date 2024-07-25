import { createClient } from "../supabase/client";
import { unstable_cache as nextCache } from "next/cache";


export const getRandomFacts = nextCache(async () => {
    const { data, error } = await createClient().from('random_facts').select('*');
    if (error) throw new Error('Failed to fetch data');
    return data
})