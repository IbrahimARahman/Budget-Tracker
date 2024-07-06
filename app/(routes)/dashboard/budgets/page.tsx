import BudgetList from "./_components/BudgetList";

export default function page(){
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Budgets</h2>
      <BudgetList/>
    </div>
  ) 
}
