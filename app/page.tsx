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
    <main className="relative min-h-screen overflow-hidden bg-black text-white flex flex-col items-center py-24 px-4 sm:px-8">
      
      {/* Cyan Ombre / Ambient Glow (background only) */}
      <div className="pointer-events-none absolute inset-0">
        {/* top glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full 
                        bg-cyan-500/25 blur-[140px]" />
        {/* subtle side glow */}
        <div className="absolute top-1/3 -right-40 w-[600px] h-[400px] rounded-full 
                        bg-cyan-400/15 blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl space-y-24 flex flex-col items-center">

        {/* Heading */}
        <h1
          className="
            text-center text-5xl md:text-7xl font-medium tracking-tight
            text-white
          "
          style={{ fontFamily: "Satoshi, system-ui, sans-serif" }}
        >
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

        {/* Bottom Section */}
        <section className="w-full flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Recent Sessions */}
          <div className="
            w-full lg:w-1/2
            rounded-3xl
            bg-white/5
            border border-white/10
            backdrop-blur-md
            p-6
          ">
            <CompanionsList
              title="Recently completed sessions"
              companions={recentSessionsCompanions}
              classNames="w-full"
            />
          </div>

          {/* CTA */}
          <div className="w-full lg:flex-1">
            <div className="
              h-full w-full
              rounded-3xl
              bg-gradient-to-br from-cyan-500/10 via-white/5 to-transparent
              border border-white/10
              backdrop-blur-md
              flex flex-col justify-center
            ">
              <CTA />
            </div>
          </div>

        </section>
      </div>
    </main>
  );
};

export default Page;
