"use client";
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image src="/logo.svg" alt="logo" width={100} height={70} priority />
      <div className="mt-5">
        {menuList.map((menuItem, index) => (
          <Link href={menuItem.path} key={index}>
            <h2 className={`flex gap-2 items-center text-gray-500 font-medium 
            p-5 cursor-pointer rounded-md
            hover:text-primary hover:bg-blue-100
            ${path === menuItem.path && "text-primary bg-blue-100"}
            `}>
              <menuItem.icon />
              {menuItem.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2
      items-center">
        <UserButton appearance={{elements: {userButtonAvatarBox: "w-10 h-10"}}} />
        Profile
      </div>
    </div>
  );
}
