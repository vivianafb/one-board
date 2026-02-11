"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import AddGoalForm from "./AddGoalForm"


const AddGoalDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ob-btn-primary">Nueva Meta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Meta de Ahorro</DialogTitle>
        </DialogHeader>
        <AddGoalForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default AddGoalDialog;
