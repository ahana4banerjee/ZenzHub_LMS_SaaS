"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        let newUrl = "";
        if (subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            });
        }
        router.push(newUrl, { scroll: false });
    }, [subject]);

    return (
        <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger
            className="
                w-[180px]
                capitalize
                bg-white/5
                border border-white/10
                text-white
                backdrop-blur-md
                rounded-xl
                transition-all
                hover:border-cyan-400/40
                focus:ring-2
                focus:ring-cyan-500/50
            "
            >
            <SelectValue placeholder="Subject" />
            </SelectTrigger>

            <SelectContent
            className="
                bg-black/90
                backdrop-blur-xl
                border border-white/10
                rounded-xl
                text-white
            "
            >
            <SelectItem
                value="all"
                className="capitalize focus:bg-cyan-500/20 focus:text-white"
            >
                All subjects
            </SelectItem>

            {subjects.map((subject) => (
                <SelectItem
                key={subject}
                value={subject}
                className="capitalize focus:bg-cyan-500/20 focus:text-white"
                >
                {subject}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>
    );

};

export default SubjectFilter;