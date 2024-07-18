"use client";
import { db } from "@/utils/dbConfig";
import CreateBudget from "./CreateBudget";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { budgetQuery } from "@/types/queries";

export default function BudgetList() {
  const [budgetList, setBudgetList] = useState({});
  const { user } = useUser();
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
      // @ts-ignore
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  };

  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
      md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateBudget refreshData={() => getBudgetList()}/>
        {Object.values(budgetList).length > 0 ? Object.values(budgetList).map((budget, index) => (
          <BudgetItem budget={budget as budgetQuery} key={index} />
        ))
        :[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <div key={index} className="w-full bg-slate-200 rounded-lg h-[145px] animate-pulse"></div>
        ))
        }
      </div>
    </div>
  );
}
