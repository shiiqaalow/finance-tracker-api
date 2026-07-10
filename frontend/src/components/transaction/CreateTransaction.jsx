import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useForm } from "react-hook-form";
import { api } from "../../api/Apiclient";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { extractErrorMessages } from "../../utils/errorUtils";
import { Loader2, X } from "lucide-react";

export const CreateTransaction = ({ open = true, onClose, transaction, categories }) => {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const TransactionFields = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter transaction title",
      validation: { required: "Title is required" },
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      placeholder: "Enter transaction amount",
      validation: { required: "Amount is required" },
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { value: "income", label: "Income" },
        { value: "expense", label: "Expense" },
      ],
      validation: { required: "Type is required" },
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categories?.map((c) => ({
        value: c._id,
        label: c.name,
      })) ?? [
        { value: "6a4360d05c7fa01ba481f86a", label: "Food" },
        { value: "6a43757f8dd403781d3cf207", label: "Electronics" },
        { value: "6a4375a98dd403781d3cf209", label: "Salary" },
        { value: "6a4385361e57b319aaab84f7", label: "Beverages" },
        { value: "6a43759b8dd403781d3cf208", label: "Transport" },
      ],
      validation: { required: "Category is required" },
    },
  ];

  // ─── Create ───────────────────────────────────────────────
  const createTransactionMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/transactions/create", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setError(null);
      toast.success("Transaction added successfully");
      reset();
      onClose();
    },
    onError: (err) => {
      setError(extractErrorMessages(err));
      toast.error("Failed to add transaction");
    },
  });

  // ─── Update ───────────────────────────────────────────────
  const updateTransactionMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/transactions/update/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      setError(null);
      toast.success("Transaction updated successfully");
      reset();
      onClose();
    },
    onError: (err) => {
      setError(extractErrorMessages(err));
      toast.error("Failed to update transaction");
    },
  });

  const isPending =
    createTransactionMutation.isPending || updateTransactionMutation.isPending;

  // ─── Submit ───────────────────────────────────────────────
  const onSubmit = (data) => {
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      setError("Amount must be a positive number");
      return;
    }

    const transactionData = {
      title: data.title,
      amount,
      type: data.type,
      category: data.category,
    };

    if (transaction) {
      updateTransactionMutation.mutate({ id: transaction._id, data: transactionData });
    } else {
      createTransactionMutation.mutate(transactionData);
    }
  };

  // ─── Populate form when editing ───────────────────────────
  useEffect(() => {
    if (transaction) {
      reset({
        title: transaction.title,
        amount: transaction.amount,
        type: transaction.type,
        category:
          typeof transaction.category === "object"
            ? transaction.category._id
            : transaction.category,
      });
    } else {
      reset({ title: "", amount: "", type: "", category: "" });
    }
  }, [transaction, reset]);

  const inputClass =
    "border-input bg-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] px-6 py-6">
        <p className="text-lg font-semibold">
          {transaction ? "Update Transaction" : "Add Transaction"}
        </p>
        <p className="text-sm text-muted-foreground">
          {transaction
            ? "Update the details of your transaction"
            : "Add a new transaction to your account"}
        </p>

        <form className="space-y-5 mt-4" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="flex items-center gap-2 p-2 bg-destructive/20 rounded-md">
              <X size={20} className="text-destructive shrink-0" />
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          {TransactionFields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-sm font-medium">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  id={field.name}
                  {...register(field.name, field.validation)}
                  className={inputClass}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, field.validation)}
                  className={inputClass}
                />
              )}

              {errors[field.name] && (
                <p className="text-xs text-destructive">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}

          <Button
            type="submit"
            className="w-full h-9 mt-2 cursor-pointer hover:scale-105 transition-all duration-200"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {transaction ? "Updating..." : "Adding..."}
              </span>
            ) : transaction ? (
              "Update Transaction"
            ) : (
              "Add Transaction"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};