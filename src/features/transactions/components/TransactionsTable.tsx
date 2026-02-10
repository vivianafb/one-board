"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatAmountCLP, formatPaymentMethod } from '@/lib/format';
import transactions from '@/mocks/transactions';

export const TransactionsTable = () => {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Method</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.createdAt}</TableCell>
                            <TableCell>{formatAmountCLP(transaction.amountCLP)}</TableCell>
                            <TableCell>{formatPaymentMethod(transaction.paymentMethod)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};