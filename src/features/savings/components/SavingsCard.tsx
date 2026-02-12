import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";
import { formatAmountCLP } from "@/lib/format";

const SavingsCard = ({ totalSaved }: { totalSaved: number }) => {
    return (
        <Card className="ob-card-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">Total Ahorros</CardTitle>
                <div className="ob-icon-wrap text-primary">
                    <PiggyBank className="h-4 w-4" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold tracking-tighter tabular-nums text-primary">
                    {formatAmountCLP(totalSaved)}
                </div>
                <p className="text-[10px] text-slate-500 mt-2 italic tracking-wide">
                    Acumulado en todas tus metas
                </p>
            </CardContent>
        </Card>
    )
};

export default SavingsCard;
