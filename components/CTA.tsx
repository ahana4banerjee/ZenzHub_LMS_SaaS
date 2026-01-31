import Image from "next/image";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="cta-section justify-between">
      <div className="cta-badge">Start learning your way.</div>

      <h2 className="text-3xl font-bold">
        Build and Personalize Learning Companion
      </h2>

      <p>
        Pick a name, subject, voice, & personality — and start learning through
        voice conversations that feel natural and fun.
      </p>

      <Image
        src="/images/cta.svg"
        alt="cta"
        width={362}
        height={232}
        className="mx-auto"
      />

      <Link href="/companions/new" className="w-full">
        <button
          className="
            btn-primary
            w-full
            justify-center
            text-white
            font-medium
            transition-all
            duration-300
            hover:bg-cyan-500
            hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]
            hover:-translate-y-0.5
            active:translate-y-0
            active:shadow-[0_0_15px_rgba(34,211,238,0.25)]
          "
        >
          <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
          <span className="text-white/95 tracking-wide">
            Build a New Companion
          </span>
        </button>

      </Link>
    </section>
  );
};
export default Cta;