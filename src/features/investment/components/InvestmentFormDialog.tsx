"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useInvestmentStore } from "../store";
import type { Investment } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  type: z.enum(["ETF", "CASH_INTEREST", "CRYPTO", "STOCK"] as const),
  provider: z.string().min(1, "El proveedor es requerido"),
  currency: z.enum(["CLP", "USD"] as const),
  investedAmount: z.coerce.number().min(1, "Debe ser mayor a 0"),
  currentValue: z.coerce.number().min(0, "No puede ser negativo"),
  createdAt: z.string().min(1, "La fecha es requerida"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  investment?: Investment;
};

const today = new Date().toISOString().split("T")[0];

export function InvestmentFormDialog({ open, onOpenChange, investment }: Props) {
  const { add, update } = useInvestmentStore((s) => s.actions);
  const isEdit = !!investment;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: investment
      ? {
          name: investment.name,
          type: investment.type,
          provider: investment.provider,
          currency: investment.currency,
          investedAmount: investment.investedAmount,
          currentValue: investment.currentValue,
          createdAt: investment.createdAt,
        }
      : {
          name: "",
          type: "ETF",
          provider: "",
          currency: "CLP",
          investedAmount: 0,
          currentValue: 0,
          createdAt: today,
        },
  });

  const onSubmit = (values: FormValues) => {
    if (isEdit && investment) {
      update(investment.id, values);
    } else {
      add({ id: crypto.randomUUID(), ...values, periods: [] });
    }
    form.reset();
    onOpenChange(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) form.reset();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="ob-card-glass sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Editar inversión" : "Agregar inversión"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="ej: S&P 500 ETF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ETF">ETF</SelectItem>
                        <SelectItem value="CASH_INTEREST">Interés</SelectItem>
                        <SelectItem value="CRYPTO">Crypto</SelectItem>
                        <SelectItem value="STOCK">Acción</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moneda</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CLP">CLP</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Proveedor</FormLabel>
                    <FormControl>
                      <Input placeholder="ej: Fintual, BTG, Buda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="investedAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto invertido</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor actual</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        style={{ colorScheme: "dark", cursor: "pointer" }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="ob-btn-primary">
                {isEdit ? "Guardar cambios" : "Agregar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
