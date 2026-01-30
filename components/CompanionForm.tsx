"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion is required.' }),
    subject: z.string().min(1, { message: 'Subject is required.' }),
    topic: z.string().min(1, { message: 'Topic is required.' }),
    voice: z.string().min(1, { message: 'Voice is required.' }),
    style: z.string().min(1, { message: 'Style is required.' }),
    duration: z.coerce.number().min(1, { message: 'Duration is required.' }),
})

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values);

        if (companion) {
            redirect(`/companions/${companion.id}`);
        } else {
            console.log('Failed to create a companion');
            redirect('/');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400 font-medium ml-1">Companion Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter the companion name"
                                    {...field}
                                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-700 h-11"
                                />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400 font-medium ml-1">Subject</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100 focus:ring-zinc-700 h-11 capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                                        {subjects.map((subject) => (
                                            <SelectItem
                                                value={subject}
                                                key={subject}
                                                className="capitalize focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer"
                                            >
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400 font-medium ml-1">What should the companion help with?</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Ex. Derivatives & Integrals"
                                    {...field}
                                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-700 min-h-[100px] resize-none p-4"
                                />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="voice"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-400 font-medium ml-1">Voice</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100 focus:ring-zinc-700 h-11">
                                            <SelectValue
                                                placeholder="Select voice"
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                                            <SelectItem value="male" className="focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer">
                                                Male
                                            </SelectItem>
                                            <SelectItem value="female" className="focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer">
                                                Female
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="style"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-zinc-400 font-medium ml-1">Style</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-100 focus:ring-zinc-700 h-11">
                                            <SelectValue
                                                placeholder="Select style"
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                                            <SelectItem value="formal" className="focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer">
                                                Formal
                                            </SelectItem>
                                            <SelectItem value="casual" className="focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer">
                                                Casual
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-red-400" />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-zinc-400 font-medium ml-1">Estimated session duration (mins)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="15"
                                    {...field}
                                    className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-700 h-11"
                                />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full cursor-pointer bg-zinc-100 text-zinc-950 hover:bg-zinc-300 font-semibold h-11 mt-2">Build Your Companion</Button>
            </form>
        </Form>
    )
}

export default CompanionForm
