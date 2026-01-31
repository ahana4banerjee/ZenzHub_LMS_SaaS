import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;

    // Ignore favicon or static assets that might be caught by [id]
    if (id === 'favicon.ico') return null;

    const companion = await getCompanion(id);
    const user = await currentUser();

    const { name, subject, title, topic, duration } = companion;

    if (!user) redirect('/sign-in');
    if (!name) redirect('/companions')

    return (
        <main className="min-h-screen bg-zinc-950 p-6 md:p-12 font-sans text-zinc-200">
            <article className="flex bg-zinc-900/50 border border-zinc-800 rounded-2xl justify-between p-6 max-md:flex-col backdrop-blur-sm shadow-sm mb-8 items-center">
                <div className="flex items-center gap-4">
                    <div className="size-[64px] flex items-center justify-center rounded-xl bg-zinc-800/50 border border-zinc-700/50 max-md:hidden">
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={32} height={32} className="opacity-80" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <p className="font-semibold text-xl text-zinc-100 tracking-tight">
                                {name}
                            </p>
                            <div className="bg-zinc-800 text-zinc-400 border border-zinc-700 px-2.5 py-0.5 rounded-md text-xs font-medium uppercase tracking-wider max-sm:hidden">
                                {subject}
                            </div>
                        </div>
                        <p className="text-zinc-400 text-sm">{topic}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 font-medium text-sm border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 rounded-lg max-md:hidden">
                    <Image src="/icons/clock.svg" alt="duration" width={14} height={14} className="opacity-60" />
                    {duration} minutes
                </div>
            </article>

            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>
    )
}

export default CompanionSession
