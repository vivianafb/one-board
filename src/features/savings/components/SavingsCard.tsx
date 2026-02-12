import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";
import { formatAmountCLP } from "@/lib/format";

const SavingsCard = ({ totalSaved }: { totalSaved: number }) => {
    return (
        <Card className="ob-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Ahorros</CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-primary">
                    {formatAmountCLP(totalSaved)}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    Acumulado en todas tus metas
                </p>
            </CardContent>
        </Card>
    )
};

export default SavingsCard;
