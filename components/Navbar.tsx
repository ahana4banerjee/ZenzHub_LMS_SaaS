import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 relative overflow-hidden">
      {/* Ombre background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(13,148,136,0.35)_0%,_rgba(0,0,0,0.85)_55%,_rgba(0,0,0,1)_100%)]" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      <nav className="navbar relative z-10 text-white">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/Zenzubassets/genz.jpg"
              alt="Zenzhub logo"
              width={40}
              height={30}
              priority
            />
            <span className="text-lg font-semibold tracking-tight">
              Zenzhub
            </span>
          </div>
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-6">
          <NavItems />

          <SignedOut>
            <SignInButton>
              <button className="btn-signin border-white/30 text-white hover:bg-white/10">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
