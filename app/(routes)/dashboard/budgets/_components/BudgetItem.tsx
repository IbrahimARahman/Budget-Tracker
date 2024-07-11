import { budgetQuery } from "@/types/queries";
import Link from "next/link";

export default function BudgetItem({ budget }: { budget: budgetQuery }) {
  const calculateProgress = () => {
    const percentage =
      ((budget.totalSpent ? budget.totalSpent : 0) / budget.amount) * 100;
    return percentage.toFixed(2);
  };

  return (
    <Link
      href={"/dashboard/expenses/" + budget.id}
      className="p-5 border rounded-lg
    hover:shadow-md cursor-pointer h-[170px]"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {budget.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItems} Items</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${budget.amount}</h2>
      </div>

      <div className="mt-5">
        <div className="flex item-center justify-between mb-1">
          <h2 className="text-xs text-slate-400">
            ${budget.totalSpent ? budget.totalSpent : 0} Spent
          </h2>
          <h2 className="text-xs text-slate-400">
            ${budget.amount - (budget.totalSpent ? budget.totalSpent : 0)}{" "}
            Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
