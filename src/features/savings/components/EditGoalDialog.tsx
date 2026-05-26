"use client"

import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSavingsStore } from "../store"
import type { SavingGoal } from "../types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form as ShadcnForm, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  targetAmount: z.union([z.string(), z.number()])
    .transform((v) => (typeof v === "string" ? Number(v) : v))
    .pipe(z.number().min(1, "La meta debe ser mayor a 0")),
  category: z.enum(["EMERGENCY_FUND", "TRAVEL", "HOME", "RETIREMENT", "OTHER"]),
})

type FormValues = z.infer<typeof formSchema>

type EditGoalDialogProps = {
  goal: SavingGoal
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditGoalDialog({ goal, open, onOpenChange }: EditGoalDialogProps) {
  const updateGoal = useSavingsStore((s) => s.actions.updateGoal)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    values: {
      name: goal.name,
      targetAmount: goal.targetAmount,
      category: goal.category,
    },
  })

  const onSubmit = (values: FormValues) => {
    updateGoal(goal.id, values)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="ob-card-glass">
        <DialogHeader>
          <DialogTitle>Editar Meta</DialogTitle>
        </DialogHeader>
        <ShadcnForm {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la meta</FormLabel>
                  <FormControl><Input placeholder="Ej: Fondo de Emergencia" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta de ahorro</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="EMERGENCY_FUND">Fondo de Emergencia</SelectItem>
                      <SelectItem value="TRAVEL">Viajes</SelectItem>
                      <SelectItem value="HOME">Hogar</SelectItem>
                      <SelectItem value="RETIREMENT">Jubilación</SelectItem>
                      <SelectItem value="OTHER">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full ob-btn-primary">Guardar cambios</Button>
          </form>
        </ShadcnForm>
      </DialogContent>
    </Dialog>
  )
}
