"use client"
import { Budgets } from "@/utils/schema";
import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { eq } from "drizzle-orm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({children}: {children: React.ReactNode}) {

  const {user} = useUser();

  const router = useRouter();

  useEffect(() => {
    user && checkUserBudgets();
  }, [user])

  const checkUserBudgets = async () => {
    const result = await db.select()
    .from(Budgets)
    // @ts-ignore
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    if(result?.length === 0){
      router.replace("/dashboard/budgets")
    }
  }

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav/> 
      </div>
      <div className="md:ml-64">
        <DashboardHeader/>
        {children}
      </div>
    </div>
  )
}
