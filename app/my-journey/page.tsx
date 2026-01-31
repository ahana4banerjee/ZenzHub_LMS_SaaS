import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";
import { CheckCircle, GraduationCap } from "lucide-react";

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="relative min-h-screen px-6 md:px-12 py-10 text-zinc-200 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] 
        bg-cyan-400/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[400px] 
        bg-cyan-300/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">

        {/* Profile Header */}
        <section className="flex justify-between gap-8 max-md:flex-col items-center
          bg-zinc-900/50 border border-white/10 rounded-3xl
          p-8 backdrop-blur-xl shadow-2xl">

          <div className="flex gap-6 items-center">
            <div className="relative size-[96px] rounded-full overflow-hidden
              border-2 border-cyan-400/30">
              <Image
                src={user.imageUrl}
                alt={user.firstName!}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-zinc-400 text-sm">
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 min-w-[140px]
              bg-zinc-950/60 border border-white/10 rounded-2xl
              p-4 flex flex-col gap-1 hover:border-cyan-400/40 transition-all">

              <div className="flex gap-2 items-center text-cyan-300 text-xs font-semibold uppercase">
                <CheckCircle className="w-4 h-4" />
                Completed
              </div>
              <p className="text-3xl font-bold text-white mt-1">
                {sessionHistory.length}
              </p>
            </div>

            <div className="flex-1 min-w-[140px]
              bg-zinc-950/60 border border-white/10 rounded-2xl
              p-4 flex flex-col gap-1 hover:border-cyan-400/40 transition-all">

              <div className="flex gap-2 items-center text-cyan-300 text-xs font-semibold uppercase">
                <GraduationCap className="w-4 h-4" />
                Created
              </div>
              <p className="text-3xl font-bold text-white mt-1">
                {companions.length}
              </p>
            </div>
          </div>
        </section>

        {/* Accordions */}
        <section className="bg-zinc-900/40 border border-white/10 rounded-3xl
          p-6 md:p-8 backdrop-blur-xl shadow-xl">

          <Accordion type="multiple" className="w-full space-y-2">

            {/* Bookmarks */}
            <AccordionItem value="bookmarks" className="border-white/10">
             <AccordionTrigger
  className="flex items-center gap-3 text-lg font-semibold
             text-zinc-200 hover:text-cyan-300 hover:no-underline">

  <span>Bookmarked Companions</span>

  <span className="ml-auto mr-3 text-sm text-zinc-400">
    ({bookmarkedCompanions.length})
  </span>
</AccordionTrigger>


              <AccordionContent>
                <div className="mt-4">
                  <CompanionsList
                    companions={bookmarkedCompanions}
                    title=""
                    classNames="gap-4"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Recent */}
            <AccordionItem value="recent" className="border-white/10">
              <AccordionTrigger
  className="text-lg font-semibold
             text-zinc-200 hover:text-cyan-300 hover:no-underline">
  Recent Sessions
</AccordionTrigger>

              <AccordionContent>
                <div className="mt-4">
                  <CompanionsList
                    companions={sessionHistory}
                    title=""
                    classNames="gap-4"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* My Companions */}
            <AccordionItem value="companions" className="border-white/10 border-b-0">
              <AccordionTrigger
  className="flex items-center gap-3 text-lg font-semibold
             text-zinc-200 hover:text-cyan-300 hover:no-underline">

  <span>My Companions</span>

  <span className="ml-auto mr-3 text-sm text-zinc-400">
    ({companions.length})
  </span>
</AccordionTrigger>

              <AccordionContent>
                <div className="mt-4">
                  <CompanionsList
                    title=""
                    companions={companions}
                    classNames="gap-4"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </section>
      </div>
    </main>
  );
};

export default Profile;
