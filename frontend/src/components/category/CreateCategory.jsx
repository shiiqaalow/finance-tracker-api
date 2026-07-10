import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { api } from "../../api/Apiclient"
import { Dialog, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { extractErrorMessages } from "../../utils/errorUtils"
import { Loader2, X } from "lucide-react"

const inputClass =
  "border-input bg-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"

export const CreateCategory = ({ open, onClose, category }) => {
  const [error, setError] = useState(null)
  const queryClient = useQueryClient()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    values: category
      ? { name: category.name, type: category.type }
      : { name: "", type: "" },
  })

  // ─── Create ───────────────────────────────────────────────
  const createMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/categories/create", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Category created")
      setError(null)
      reset()
      onClose()
    },
    onError: (err) => {
      setError(extractErrorMessages(err))
      toast.error("Failed to create category")
    },
  })

  // ─── Update ───────────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`/categories/update/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Category updated")
      setError(null)
      reset()
      onClose()
    },
    onError: (err) => {
      setError(extractErrorMessages(err))
      toast.error("Failed to update category")
    },
  })

  const isPending = createMutation.isPending || updateMutation.isPending

  const onSubmit = (data) => {
    setError(null)
    if (category) {
      updateMutation.mutate({ id: category._id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] px-6 py-6">
        <p className="text-lg font-semibold">
          {category ? "Edit Category" : "New Category"}
        </p>
        <p className="text-sm text-muted-foreground">
          {category
            ? "Update this category's name or type"
            : "Create a new spending or income category"}
        </p>

        <form className="space-y-5 mt-4" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="flex items-center gap-2 p-2 bg-destructive/20 rounded-md">
              <X size={16} className="text-destructive shrink-0" />
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Name</label>
            <input
              placeholder="e.g. Food, Transport"
              {...register("name", { required: "Name is required" })}
              className={inputClass}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Type</label>
            <select
              {...register("type", { required: "Type is required" })}
              className={inputClass + " cursor-pointer"}
            >
              <option value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {errors.type && (
              <p className="text-xs text-destructive">{errors.type.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-9 cursor-pointer hover:scale-105 transition-all duration-200"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {category ? "Saving..." : "Creating..."}
              </span>
            ) : category ? (
              "Save Changes"
            ) : (
              "Create Category"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}