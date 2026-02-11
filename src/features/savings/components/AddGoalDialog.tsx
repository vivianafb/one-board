import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSavingsStore } from '../store';


const AddGoalDialog = () => {
    const addGoal = useSavingsStore((state) => state.actions.addGoal);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí recolectas la data y armas el objeto SavingGoal
        // addGoal(newGoal);
      };
 
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ob-btn-primary">Nueva Meta</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Meta de Ahorro</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Inputs para name, targetAmount, category */}
              <Button type="submit" className="w-full">Guardar Meta</Button>
            </form>
          </DialogContent>
        </Dialog>
      );
};

export default AddGoalDialog;
