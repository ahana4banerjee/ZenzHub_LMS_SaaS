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
    <main className="min-h-screen bg-zinc-950 p-6 md:p-12 font-sans text-zinc-100">
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-10 shadow-sm flex justify-between gap-8 max-md:flex-col items-center">
        <div className="flex gap-6 items-center">
          <div className="relative size-[100px] rounded-full overflow-hidden border-2 border-zinc-800 shadow-md">
            <Image
              src={user.imageUrl}
              alt={user.firstName!}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-3xl text-white tracking-tight">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-zinc-500 font-medium">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col gap-1 min-w-[140px] flex-1">
            <div className="flex gap-2 items-center text-zinc-400 text-xs font-bold uppercase tracking-wider">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={16}
                height={16}
                className="opacity-60"
              />
              Completed
            </div>
            <p className="text-3xl font-bold text-white mt-1">{sessionHistory.length}</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col gap-1 min-w-[140px] flex-1">
            <div className="flex gap-2 items-center text-zinc-400 text-xs font-bold uppercase tracking-wider">
              <Image src="/icons/cap.svg" alt="cap" width={16} height={16} className="opacity-60" />
              Created
            </div>
            <p className="text-3xl font-bold text-white mt-1">{companions.length}</p>
          </div>
        </div>
      </section>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="bookmarks" className="border-zinc-800">
            <AccordionTrigger className="text-xl font-semibold text-zinc-200 hover:text-white hover:no-underline">
              Bookmarked Companions <span className="text-zinc-500 ml-2 text-base font-normal">{`(${bookmarkedCompanions.length})`}</span>
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

          <AccordionItem value="recent" className="border-zinc-800">
            <AccordionTrigger className="text-xl font-semibold text-zinc-200 hover:text-white hover:no-underline">
              Recent Sessions
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4">
                <CompanionsList
                  title=""
                  companions={sessionHistory}
                  classNames="gap-4"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="companions" className="border-zinc-800 border-b-0">
            <AccordionTrigger className="text-xl font-semibold text-zinc-200 hover:text-white hover:no-underline">
              My Companions <span className="text-zinc-500 ml-2 text-base font-normal">{`(${companions.length})`}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4">
                <CompanionsList title="" companions={companions} classNames="gap-4" />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
};
export default Profile;
