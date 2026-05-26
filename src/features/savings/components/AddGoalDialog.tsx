"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AddGoalForm from "./AddGoalForm"

type AddGoalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AddGoalDialog = ({ open, onOpenChange }: AddGoalDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="ob-card-glass">
        <DialogHeader>
          <DialogTitle>Crear Meta de Ahorro</DialogTitle>
        </DialogHeader>
        <AddGoalForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default AddGoalDialog;
