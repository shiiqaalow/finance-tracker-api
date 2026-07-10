import { TransactionCard } from "@/components/transaction/TransactionCard";

export function RecentTransactions({
  transactions = [],
}) {
  return (
    <div className="space-y-3">

      <h2 className="text-xl font-bold">
        Recent Transactions
      </h2>

      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction._id}
          transaction={transaction}
        />
      ))}

    </div>
  );
}