
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
    return (
        <article className={cn('flex flex-col gap-6', classNames)}>
            <h2 className="font-semibold text-2xl text-zinc-100">{title}</h2>

            <div className="rounded-xl border border-zinc-800 overflow-hidden">
                <Table>
                    <TableHeader className="bg-zinc-900/50">
                        <TableRow className="border-zinc-800 hover:bg-transparent">
                            <TableHead className="text-zinc-500 font-bold text-xs uppercase tracking-wider py-4 pl-6 w-2/3">Lessons</TableHead>
                            <TableHead className="text-zinc-500 font-bold text-xs uppercase tracking-wider py-4">Subject</TableHead>
                            <TableHead className="text-zinc-500 font-bold text-xs uppercase tracking-wider py-4 text-right pr-6">Duration</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-zinc-950/50">
                        {companions?.map(({ id, subject, name, topic, duration }) => (
                            <TableRow key={id} className="border-zinc-800 hover:bg-zinc-900/40 transition-colors group">
                                <TableCell className="py-4 pl-6">
                                    <Link href={`/companions/${id}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 flex items-center justify-center rounded-lg bg-zinc-800/50 border border-zinc-700/50 max-md:hidden group-hover:bg-zinc-800 transition-colors">
                                                <Image
                                                    src={`/icons/${subject}.svg`}
                                                    alt={subject}
                                                    width={24}
                                                    height={24}
                                                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="font-medium text-zinc-200 text-lg group-hover:text-white transition-colors">
                                                    {name}
                                                </p>
                                                <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors line-clamp-1">
                                                    {topic}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider w-fit max-md:hidden">
                                        {subject}
                                    </div>
                                    <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden bg-zinc-800 border border-zinc-700">
                                        <Image
                                            src={`/icons/${subject}.svg`}
                                            alt={subject}
                                            width={18}
                                            height={18}
                                            className="opacity-80"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 pr-6">
                                    <div className="flex items-center gap-2 w-full justify-end text-zinc-400 font-medium">
                                        <p className="text-sm">
                                            {duration} {' '}
                                            <span className="max-md:hidden">mins</span>
                                        </p>
                                        <Image src="/icons/clock.svg" alt="minutes" width={14} height={14} className="md:hidden opacity-60" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </article>
    )
}

export default CompanionsList;