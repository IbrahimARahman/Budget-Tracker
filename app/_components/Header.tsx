"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link"

export default function Header() {

  const {user, isSignedIn} = useUser();
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <Image src="./logo.svg" alt="logo" width={100} height={70} priority />
      {isSignedIn ?
        <UserButton appearance={{elements: {userButtonAvatarBox: "w-10 h-10"}}} /> : 
        <Link href="/sign-in">
          <Button> Get Started </Button>
        </Link>
      }
    </div>
  ) 
}
