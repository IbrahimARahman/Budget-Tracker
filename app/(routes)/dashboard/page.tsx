"use client";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { budgetQuery, expensesQuery } from "@/types/queries";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

export default function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState({});
  const [expensesList, setExpensesList] = useState({});

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpent: sql`SUM(CAST(${Expenses.amount} AS numeric))`.mapWith(
          Number,
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
    getAllExpenses();
  };

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
      // @ts-ignore
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName}</h2>
      <p className="text-gray-500">
        Here's what's happening with your money, Lets Manage your Expenses!
      </p>

      <CardInfo budgetList={budgetList as budgetQuery[]} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={budgetList as budgetQuery[]} />
          
          <ExpenseListTable expensesList={Object.values(expensesList) as expensesQuery[]} refreshData={() => getBudgetList()}/>
        </div>
        <div className="grid gap-5 self-start">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {Object.values(budgetList).map((budget, index) => (
            <BudgetItem budget={budget as budgetQuery} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
