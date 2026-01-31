import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

export const createSupabaseClient = async () => {
    const { userId, getToken } = await auth();

    const options: any = {};

    if (userId) {
        try {
            const token = await getToken({ template: 'supabase' });
            if (token) {
                options.global = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
            }
        } catch (e) {
            // console.error("Supabase Token Error:", e);
            console.log(e);
        }
    }

    // Debug logging for missing keys
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error("Supabase Env Vars Missing!", {
            url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
            key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        });
    }

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        options
    );
}