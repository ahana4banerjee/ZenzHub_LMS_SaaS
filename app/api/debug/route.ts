import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const results = {
        env: {
            NEXT_PUBLIC_SUPABASE_URL: sbUrl ? `Present (Length: ${sbUrl.length})` : 'Missing',
            NEXT_PUBLIC_SUPABASE_ANON_KEY: sbKey ? `Present (Length: ${sbKey.length})` : 'Missing',
        },
        clerk: {
            userId: null as string | null,
            token: null as string | null,
            error: null as any,
        },
        supabase: {
            connection: 'Pending',
            error: null as any,
        }
    };

    try {
        const { userId, getToken } = await auth();
        results.clerk.userId = userId;
        // Try getting token without template first
        const token = await getToken({ template: 'supabase' });
        results.clerk.token = token ? `Present (Length: ${token.length})` : 'Missing (or no template)';

        // Test Supabase Connection
        if (sbUrl && sbKey) {
            const supabase = createClient(sbUrl, sbKey, {
                global: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            });

            const { data, error } = await supabase.from('companions').select('count', { count: 'exact', head: true });

            if (error) {
                results.supabase.error = error;
                results.supabase.connection = 'Failed';
            } else {
                results.supabase.connection = 'Success';
            }
        }

    } catch (e: any) {
        results.clerk.error = e.message;
    }

    return NextResponse.json(results);
}
