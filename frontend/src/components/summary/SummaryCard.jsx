import { Card } from "@/components/ui/card";

export function SummaryCard({ summary }) {
  return (
    <div className="grid md:grid-cols-4 gap-5">

      <Card className="p-6">
        <p>Total Income</p>
        <h2>R {summary.totalIncome}</h2>
      </Card>

      <Card className="p-6">
        <p>Total Expense</p>
        <h2>R {summary.totalExpense}</h2>
      </Card>

      <Card className="p-6">
        <p>Balance</p>
        <h2>R {summary.balance}</h2>
      </Card>

      <Card className="p-6">
        <p>Transactions</p>
        <h2>{summary.totalTransactions}</h2>
      </Card>

    </div>
  );
}