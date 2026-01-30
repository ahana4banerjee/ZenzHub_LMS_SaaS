"use client";
import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const handleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(id, pathname);
    } else {
      await addBookmark(id, pathname);
    }
  };
  return (
    <article
      className="companion-card w-full h-full flex flex-col justify-between"
      style={{ backgroundColor: color }}
    >

      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={14}
            height={16}
            className={bookmarked ? "opacity-100" : "opacity-60 hover:opacity-100"}
          />
        </button>
      </div>

      <div className="flex-1 space-y-2 mb-6">
        <h2 className="text-xl font-bold text-zinc-100 leading-tight group-hover:text-white transition-colors line-clamp-2">{name}</h2>
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 min-h-[40px]">{topic}</p>
      </div>

      <div className="flex items-center gap-2 mb-6 text-zinc-500 text-xs font-medium">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={14}
          height={14}
          className="opacity-50"
        />
        <p>{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full mt-auto">
        <button className="w-full bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-all rounded-lg py-2.5 font-medium text-sm border border-zinc-700/50">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
