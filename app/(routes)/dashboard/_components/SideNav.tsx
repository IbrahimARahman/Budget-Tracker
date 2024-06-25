import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image src="/logo.svg" alt="logo" width={100} height={70} />
      <div className="mt-5">
        {menuList.map((menuItem, index) => (
          <h2 className="flex gap-2 items-center text-gray-500 font-medium 
          p-5 cursor-pointer rounded-md
          hover:text-primary hover:bg-blue-100
          ">
            <menuItem.icon />
            {menuItem.name}
          </h2>
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
