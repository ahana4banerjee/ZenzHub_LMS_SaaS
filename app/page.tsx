export const dynamic = "force-dynamic";

import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col items-center py-20 px-4 sm:px-8">
      {/* Background Glow Effect */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-900/40 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl space-y-20 flex flex-col items-center">
        
        {/* Centered Serif Heading */}
        <h1 className="text-5xl md:text-7xl font-serif text-center font-medium tracking-tight text-white drop-shadow-lg">
          Popular Companions
        </h1>

        {/* Companions Grid */}
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>

        {/* Bottom Section - Balanced Split Layout */}
        <section className="w-full flex flex-col lg:flex-row gap-8 items-stretch">
            
            {/* List - Width reduced to 50% on large screens */}
            <div className="w-full lg:w-1/2 bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 backdrop-blur-md">
                <CompanionsList
                    title="Recently completed sessions"
                    companions={recentSessionsCompanions}
                    classNames="w-full"
                />
            </div>

            {/* CTA - Expands to take the rest of the space (Rectangle) */}
            <div className="w-full lg:flex-1">
                <div className="h-full w-full bg-neutral-900/30 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col justify-center">
                    <CTA />
                </div>
            </div>

        </section>
      </div>
    </main>
  );
};

export default Page;