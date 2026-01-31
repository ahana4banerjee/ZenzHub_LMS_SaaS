import CompanionForm from "@/components/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="relative min-h-screen text-zinc-200 flex flex-col items-center pt-28 px-6 overflow-hidden">
      
      {/* Background ombre */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] 
        bg-cyan-400/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[400px] 
        bg-cyan-300/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Content */}
      {canCreateCompanion ? (
        <article className="relative z-10 w-full max-w-2xl flex flex-col gap-8 
          bg-zinc-900/40 border border-white/10 rounded-3xl 
          p-8 backdrop-blur-xl shadow-2xl">
          
          <h1 className="text-3xl font-semibold tracking-tight text-white text-center">
            Companion Builder
          </h1>

          <CompanionForm />
        </article>
      ) : (
        <article className="relative z-10 max-w-md w-full text-center flex flex-col items-center gap-6
          bg-zinc-900/50 border border-white/10 rounded-3xl
          p-8 backdrop-blur-xl shadow-2xl">

          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={180}
            height={180}
            className="opacity-80"
          />

          <div className="bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 
            px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
            Upgrade required
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              You’ve reached your limit
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Upgrade your plan to create more companions and unlock premium features.
            </p>
          </div>

          <Link
            href="/subscription"
            className="w-full py-2.5 rounded-lg font-semibold text-sm
              bg-cyan-400 text-black
              hover:bg-cyan-300
              hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]
              transition-all flex items-center justify-center"
          >
            Upgrade my plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
