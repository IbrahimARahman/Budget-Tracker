export type budgetQuery = {
  amount: number;
  createdBy: string;
  icon: string;
  id: number;
  name: string;
  totalItems: number;
  totalSpent?: number;
};

export type expensesQuery = {
   amount: string | null;
   budgetId: number | null;
   id: number;
   name: string;
   createdAt: string;
}
