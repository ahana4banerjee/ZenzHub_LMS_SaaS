"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4">

      {/* Cyan Ombre Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-cyan-500/25 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[400px] rounded-full bg-cyan-400/15 blur-[120px]" />
      </div>

      {/* Clerk Sign In */}
      <div className="relative z-10">
        <SignIn
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: "#22d3ee", // cyan
              fontFamily: "Satoshi, system-ui, sans-serif",
              borderRadius: "12px",
            },
            elements: {
              card: "bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-white/70",
              formFieldLabel: "text-white/70",
              formFieldInput:
                "bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:ring-cyan-500/50",
              formButtonPrimary:
                "bg-cyan-500 text-black hover:bg-cyan-400 transition-all",
              dividerText: "text-white/50",
              footerActionText: "text-white/60",
              footerActionLink: "text-cyan-400 hover:text-cyan-300",
              socialButtonsBlockButton:
                "bg-white/10 border border-white/20 text-white hover:bg-cyan-500/10",
            },
          }}
        />
      </div>
    </main>
  );
}
