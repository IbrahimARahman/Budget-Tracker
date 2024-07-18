"use client";
import { expensesQuery } from "@/types/queries";
import ExpenseListTable from "./_components/ExpenseListTable";
import { useEffect, useState } from "react";
import { Budgets, Expenses } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";

export default function page() {
  const [expensesList, setExpensesList] = useState({});
  const {user} = useUser();

  useEffect(() => {
    user && getAllExpenses();
  }, [user])

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    console.log(result);
    setExpensesList(result);
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>
      <ExpenseListTable
        expensesList={Object.values(expensesList) as expensesQuery[]}
        refreshData={() => getAllExpenses()}
      />
    </div>
  );
}
