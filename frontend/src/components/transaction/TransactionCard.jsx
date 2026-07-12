import {
  ArrowDownCircle,
  ArrowUpCircle,
  Utensils,
  ShoppingBag,
  BottleWine,
  Car,
  Wallet,
  MoreVertical,
  Edit2,
  Trash,
  Loader,
  Banknote,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../api/Apiclient";
import { toast } from "sonner";
import { useState } from "react";

export const TransactionCard = ({ transaction, onEdit }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const CategoryIcon = (() => {
    switch (transaction?.category?.name.toLowerCase()) {
      case "food":
        return Utensils;

      case "electronics":
        return ShoppingBag;

      case "salary":
        return Banknote;

      case "beverages":
        return BottleWine;

      case "transport":
        return Car;

      default:
        return Wallet;
    }
  })();

  const TransactionIcon =
    transaction.type === "income" ? ArrowUpCircle : ArrowDownCircle;

  const isIncome = transaction.type === "income";

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(
        `transactions/delete/${transaction._id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Task deleted successfully");
    },
    onError: (error) => {
      toast.error(`Error deleting task: ${error.message}`);
    },
  });

  const handleDeleteConfirm = async () => {
    try {
      await deleteMutation.mutateAsync(transaction._id);
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error(`Error confirming delete: ${error.message}`);
    }
  };

  return (
    <>
      <div className="rounded-xl border bg-background/60 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left */}
          <div className="flex items-start gap-4 min-w-0 flex-1">
            {/* Category Icon */}
            <div
              className={`shrink-0 rounded-xl p-3 ${
                isIncome
                  ? "bg-green-500/10 text-green-600"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <CategoryIcon className="h-5 w-5" />
            </div>

            {/* Transaction Details */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-sm font-semibold capitalize md:text-base">
                  {transaction.title}
                </h3>

                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                  {transaction.category?.name || "General"}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${
                    isIncome
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.type}
                </span>

                <span className="text-xs text-muted-foreground">
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString("en-ZA", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "No date"}
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-2">
              <TransactionIcon
                className={`h-5 w-5 ${
                  isIncome ? "text-green-600" : "text-destructive"
                }`}
              />

              <span
                className={`text-base font-bold md:text-lg ${
                  isIncome ? "text-green-600" : "text-destructive"
                }`}
              >
                {isIncome ? "+" : "-"}R
                {Number(transaction.amount || 0).toFixed(2)}
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => onEdit(transaction)}
                  className="cursor-pointer"
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setShowDeleteDialog(true)}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              transaction{" "}
              <span className="font-semibold capitalize">
                "{transaction.title}"
              </span>
              .
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
