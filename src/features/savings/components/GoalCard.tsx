import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Componente de Shadcn
import { formatAmountCLP, formatSavingGoalCategory } from "@/lib/format";
import { SavingGoal } from "@/types/finance";
import { DepositDialog } from "./DepositDialog";
export const GoalCard = ({ goal }: { goal: SavingGoal }) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;

  return (
    <Card className="ob-card-glass border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md font-semibold">{goal.name}</CardTitle>
          <span className="text-xs font-bold px-2 py-1 bg-primary/10 rounded text-primary">
            {formatSavingGoalCategory(goal.category)}
          </span>
        </div>
        <DepositDialog goalId={goal.id} goalName={goal.name} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold tracking-tighter tabular-nums">{formatAmountCLP(goal.currentAmount)}</p>
            <p className="text-[10px] text-slate-500">Meta: {formatAmountCLP(goal.targetAmount)}</p>
          </div>
          <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
        </div>
        
        {/* Barra de progreso visual */}
        <Progress value={progress} className="h-2" />
        
        <p className="text-[10px] text-right text-muted-foreground italic">
          Faltan {formatAmountCLP(goal.targetAmount - goal.currentAmount)}
        </p>
      </CardContent>
    </Card>
  );
};