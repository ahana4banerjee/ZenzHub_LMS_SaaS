import { getAllCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';

    const companions = await getAllCompanions({ subject, topic });

    return (
        <main className="min-h-screen bg-zinc-950 p-6 md:p-12 font-sans text-zinc-100">
            <section className="flex justify-between items-center gap-6 max-sm:flex-col mb-10">
                <h1 className="text-3xl font-semibold tracking-tight text-white">Companion Library</h1>
                <div className="flex gap-3 w-full sm:w-auto">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>
            <section className="companions-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>
        </main>
    )
}

export default CompanionsLibrary
