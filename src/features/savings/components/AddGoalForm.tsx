"use client"

import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSavingsStore } from "../store"
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

const AddGoalForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const addGoal = useSavingsStore((state) => state.actions.addGoal)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      name: "",
      targetAmount: 0,
      category: "OTHER",
    },
  })

  const onSubmit = (values: FormValues) => {
    addGoal({
      id: crypto.randomUUID(),
      ...values,
      currentAmount: 0,
      currency: "CLP",
      createdAt: new Date().toISOString(),
    })
    onSuccess() // Para cerrar el modal automáticamente
  }

  return (
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="EMERGENCY_FUND">Fondo de Emergencia</SelectItem>
                  <SelectItem value="TRAVEL">Viajes</SelectItem>
                  <SelectItem value="HOME">Hogar</SelectItem>
                  <SelectItem value="OTHER">Otro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Guardar Meta</Button>
      </form>
    </ShadcnForm>
  )
}

export default AddGoalForm