export interface Person {
    id?: number;
    name: string;
    age: number;
}

export type TransactionType = 'Receita' | 'Despesa';

export interface Transaction {
    id?: number;
    description: string;
    value: number;
    type: TransactionType;
    personId: number;
}

