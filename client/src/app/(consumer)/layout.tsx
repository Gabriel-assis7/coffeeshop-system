import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export default async function ConsumerLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export function NavBar() {
  return (
    <header className="flex justify-between items-center text-white bg-black h-14 z-10">
      <div className="flex container justify-between mx-auto items-center">
        <Link href={"/"} className="text-white text-xl font-medium">
          Coffee Shop
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex space-x-12">
            <Link className="hover:text-blue-100" href={"/"}>
              Home
            </Link>
            <Link className="hover:text-blue-100" href={"/"}>
              Menu
            </Link>
            <Link className="hover:text-blue-100" href={"/"}>
              About Us
            </Link>
            <Link className="hover:text-blue-100" href={"/"}>
              Order
            </Link>
            <Link className="hover:text-blue-100" href={"/"}>
              Contact
            </Link>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Suspense>
            <SignedOut>
              <Button asChild>
                <SignInButton>Sign In</SignInButton>
              </Button>
            </SignedOut>
          </Suspense>
          <Suspense>
            <SignedIn>
              <Link href={"/purchases"}>My orders</Link>
            </SignedIn>
          </Suspense>
          <Suspense
            fallback={<Skeleton className="w-6 h-6 rounded-md bg-gray-300" />}
          >
            <SignedIn>
              <div className="size-8">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: { width: "100%", height: "100%" },
                    },
                  }}
                />
              </div>
            </SignedIn>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
