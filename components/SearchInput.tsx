'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500)
    }, [searchQuery, router, searchParams, pathname]);

    return (
        <div
            className="
            relative
            flex items-center gap-3
            h-11 w-full md:min-w-[300px]
            rounded-xl
            px-3 py-2.5
            bg-white/5
            border border-white/10
            backdrop-blur-md
            transition-all
            focus-within:ring-2
            focus-within:ring-cyan-500/50
            hover:border-cyan-400/40
            "
        >
            <Image
            src="/icons/search.svg"
            alt="search"
            width={16}
            height={16}
            className="opacity-50"
            />
            <input
            placeholder="Search companions..."
            className="
                w-full
                bg-transparent
                outline-none
                text-sm
                text-white
                placeholder:text-white/50
            "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );

}
export default SearchInput
