import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
    const { userId } = await auth();
    if (!userId) redirect('/sign-in');

    const canCreateCompanion = await newCompanionPermissions();

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-200 flex flex-col items-center pt-24 p-6">
            {canCreateCompanion ? (
                <article className="w-full max-w-2xl gap-8 flex flex-col">
                    <h1 className="text-3xl font-semibold tracking-tight text-white text-center mb-4">Companion Builder</h1>

                    <CompanionForm />
                </article>
            ) : (
                <article className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl max-w-md text-center flex flex-col items-center gap-6">
                    <div className="relative">
                        <Image src="/images/limit.svg" alt="Companion limit reached" width={200} height={200} className="rounded-lg opacity-80" />
                    </div>
                    <div className="bg-amber-900/30 text-amber-500 border border-amber-800/50 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                        Upgrade your plan
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-white">You’ve Reached Your Limit</h1>
                        <p className="text-zinc-400 text-sm leading-relaxed">You’ve reached your companion limit. Upgrade to create more companions and premium features.</p>
                    </div>
                    <Link href="/subscription" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 transition-all w-full py-2.5 rounded-lg font-medium flex items-center justify-center" >
                        Upgrade My Plan
                    </Link>
                </article>
            )}
        </main>
    )
}

export default NewCompanion
