import useSWR from "swr";

async function fetcher() {
    const res = await fetch('/api/user');
    if (res.ok) {

    }
}


export function useUser() {
    return useSWR('user', fetcher)
}