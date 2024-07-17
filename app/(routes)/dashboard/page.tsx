"use client"
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { budgetQuery } from "@/types/queries";
import BarChartDashboard from "./_components/BarChartDashboard";

export default function Dashboard() {
  const {user} = useUser();
  const [budgetList, setBudgetList] = useState({});

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpent: sql`SUM(CAST(${Expenses.amount} AS numeric))`.mapWith(
          Number
        ),
        totalItems: sql`COUNT(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };
  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
      <p className="text-gray-500">Here's what's happening with your money, Lets Manage your Expenses!</p>

      <CardInfo budgetList={budgetList as budgetQuery[]}/>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList as budgetQuery[]}/>
        </div>
        <div>
          Other Content
        </div>
      </div>
    </div>
  )
}
