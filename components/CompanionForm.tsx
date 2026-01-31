"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, { message: "Companion is required." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: "Topic is required." }),
  voice: z.string().min(1, { message: "Voice is required." }),
  style: z.string().min(1, { message: "Style is required." }),
  duration: z.coerce.number().min(1, { message: "Duration is required." }),
});

const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companion = await createCompanion(values);
    if (companion) redirect(`/companions/${companion.id}`);
    redirect("/");
  };

  return (
    <Form {...form}>
      <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-sm ml-1">
                Companion name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. Algebra Buddy"
                  className="h-11 bg-zinc-900/70 border border-zinc-800
                    text-zinc-100 placeholder:text-zinc-600
                    focus-visible:ring-2 focus-visible:ring-cyan-400/40
                    focus-visible:border-cyan-400/40 transition-all"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Subject */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-sm ml-1">
                Subject
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger
                    className="h-11 bg-zinc-900/70 border border-zinc-800
                      text-zinc-100 capitalize
                      focus:ring-2 focus:ring-cyan-400/40"
                  >
                    <SelectValue placeholder="Choose subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                  {subjects.map((subject) => (
                    <SelectItem
                      key={subject}
                      value={subject}
                      className="capitalize cursor-pointer
                        focus:bg-cyan-400/10 focus:text-cyan-200"
                    >
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Topic */}
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-sm ml-1">
                What should it help with?
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g. Integrals, limits, derivatives…"
                  className="min-h-[100px] resize-none
                    bg-zinc-900/70 border border-zinc-800
                    text-zinc-100 placeholder:text-zinc-600
                    focus-visible:ring-2 focus-visible:ring-cyan-400/40
                    transition-all"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Voice + Style */}
        <div className="grid grid-cols-2 gap-4">
          {["voice", "style"].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as "voice" | "style"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-400 text-sm ml-1 capitalize">
                    {fieldName}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className="h-11 bg-zinc-900/70 border border-zinc-800
                          text-zinc-100
                          focus:ring-2 focus:ring-cyan-400/40"
                      >
                        <SelectValue placeholder={`Select ${fieldName}`} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                      <SelectItem
                        value={fieldName === "voice" ? "male" : "formal"}
                        className="focus:bg-cyan-400/10 focus:text-cyan-200"
                      >
                        {fieldName === "voice" ? "Male" : "Formal"}
                      </SelectItem>
                      <SelectItem
                        value={fieldName === "voice" ? "female" : "casual"}
                        className="focus:bg-cyan-400/10 focus:text-cyan-200"
                      >
                        {fieldName === "voice" ? "Female" : "Casual"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-sm ml-1">
                Session duration (minutes)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  className="h-11 bg-zinc-900/70 border border-zinc-800
                    text-zinc-100 placeholder:text-zinc-600
                    focus-visible:ring-2 focus-visible:ring-cyan-400/40"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* CTA */}
        <Button
          type="submit"
          className="w-full h-11 mt-4 font-semibold
            bg-cyan-400 text-black
            hover:bg-cyan-300
            hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]
            transition-all"
        >
          Build your companion
        </Button>
      </form>
    </Form>
  );
};

export default CompanionForm;

