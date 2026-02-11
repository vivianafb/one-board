"use client"

import { useState } from "react"
import { useSavingsStore } from "../store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"

export function DepositDialog({ goalId, goalName }: { goalId: string; goalName: string }) {
  const [amount, setAmount] = useState("")
  const [open, setOpen] = useState(false)
  const addDeposit = useSavingsStore((state) => state.actions.addDeposit)

  const handleDeposit = () => {
    const numAmount = Number(amount)
    if (numAmount <= 0) return

    // Obtenemos el mes actual en formato YYYY-MM
    const currentMonth = new Date().toISOString().substring(0, 7)
    
    addDeposit(goalId, numAmount, currentMonth)
    setAmount("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
          <PlusCircle className="h-3.5 w-3.5" />
          Aportar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle className="text-sm">Aportar a: {goalName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input
            type="number"
            placeholder="Monto a sumar"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={handleDeposit} className="w-full ob-btn-primary">
            Confirmar Aporte
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}