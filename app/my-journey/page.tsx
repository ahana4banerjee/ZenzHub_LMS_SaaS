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

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-20 overflow-hidden">
      
      {/* Cyan ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[400px] rounded-full bg-cyan-400/15 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-14">

        {/* Profile Header */}
        <section className="flex justify-between gap-6 max-sm:flex-col items-start">
          <div className="flex gap-5 items-center">
            <Image
              src={user.imageUrl}
              alt={user.firstName!}
              width={96}
              height={96}
              className="rounded-full border border-white/10"
            />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-medium tracking-tight">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-white/60">
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 backdrop-blur-md">
              <div className="flex gap-2 items-center">
                <Image src="/icons/check.svg" alt="check" width={20} height={20} />
                <p className="text-2xl font-semibold">{sessionHistory.length}</p>
              </div>
              <p className="text-sm text-white/70">Lessons completed</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 backdrop-blur-md">
              <div className="flex gap-2 items-center">
                <Image src="/icons/cap.svg" alt="cap" width={20} height={20} />
                <p className="text-2xl font-semibold">{companions.length}</p>
              </div>
              <p className="text-sm text-white/70">Companions created</p>
            </div>
          </div>
        </section>

        {/* Accordion */}
        <Accordion type="multiple" className="flex flex-col gap-6">

          <AccordionItem
            value="bookmarks"
            className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
          >
            <AccordionTrigger className="px-6 py-4 text-lg font-medium text-white hover:text-cyan-400">
              Bookmarked Companions ({bookmarkedCompanions.length})
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <CompanionsList
                companions={bookmarkedCompanions}
                title="Bookmarked Companions"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="recent"
            className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
          >
            <AccordionTrigger className="px-6 py-4 text-lg font-medium text-white hover:text-cyan-400">
              Recent Sessions
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <CompanionsList
                title="Recent Sessions"
                companions={sessionHistory}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="companions"
            className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
          >
            <AccordionTrigger className="px-6 py-4 text-lg font-medium text-white hover:text-cyan-400">
              My Companions ({companions.length})
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <CompanionsList title="My Companions" companions={companions} />
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </main>
  );
};

export default Profile;
