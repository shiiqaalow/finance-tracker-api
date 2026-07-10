import { ArrowUpRight, BadgeCheck, CreditCard, Wallet } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const stats = [
  {
    title: "Transactions",
    value: "1,248",
    icon: Wallet,
    color: "text-blue-500",
  },
  {
    title: "Cards",
    value: "4",
    icon: CreditCard,
    color: "text-violet-500",
  },
  {
    title: "Income",
    value: "$24,800",
    icon: ArrowUpRight,
    color: "text-green-500",
  },
  {
    title: "Profile Score",
    value: "96%",
    icon: BadgeCheck,
    color: "text-orange-500",
  },
];
export const UserStats = () => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="rounded-2xl shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
              </div>

              <div className={`rounded-2xl bg-muted p-4 ${item.color}`}>
                <Icon className="h-7 w-7" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
