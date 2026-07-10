import {
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

export const CategoryCard = ({ category, onEdit }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const CategoryIcon = (() => {
    switch (category.name.toLowerCase()) {
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

  const isIncome = category.type === "income";

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`categories/delete/${category._id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Task deleted successfully");
    },
    onError: (error) => {
      toast.error(`Error deleting task: ${error.message}`);
    },
  });

  const handleDeleteConfirm = async () => {
    try {
      await deleteMutation.mutateAsync(category._id);
      setShowDeleteDialog(false);
    } catch (error) {
      toast.error(`Error confirming delete: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-xl border bg-background/60 p-4 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Category Icon */}
        <div
          className={`p-3 rounded-xl ${
            isIncome
              ? "bg-green-500/10 text-green-600"
              : "bg-primary/10 text-primary"
          }`}
        >
          <CategoryIcon size={22} />
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold capitalize">{category.name}</p>
            <span
              className={`mr-3 text-xs px-2  rounded-full font-medium ${
                isIncome
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {category.type}
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-1 capitalize">
            {category.createdAt
              ? new Date(category.createdAt).toLocaleDateString("en-ZA", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "No date"}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3"></div>
      {/* actions */}

      {/* Dprodown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            // disabled={isLoading}
            className="h-8 w-8 p-0 cursor-pointer"
          >
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => onEdit(category)}
            className="cursor-pointer"
          >
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(category)}
            className="cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              transaction
              <span className="font-bold text-xl capitalize">
                {" "}
                "{category.name}".
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {deleteMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader size="20" />
                  Deleting...
                </span>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
