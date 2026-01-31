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
    <main className="relative min-h-screen overflow-hidden bg-black text-white px-6 md:px-12 py-20">
      
      {/* Cyan Ombre / Ambient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[400px] rounded-full bg-cyan-400/15 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-14">

        {/* Header */}
        <section className="flex justify-between items-center gap-6 max-sm:flex-col">
          <h1
            className="text-4xl md:text-5xl font-medium tracking-tight text-white"
            style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}
          >
            Companion Library
          </h1>

          <div className="flex gap-3 w-full sm:w-auto">
            <SearchInput />
            <SubjectFilter />
          </div>
        </section>

        {/* Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default CompanionsLibrary;

