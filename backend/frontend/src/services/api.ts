import type { Person, Transaction } from '../types';

const BASE_URL = 'http://localhost:5225/api';

async function handleResponse(response: Response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Ocorreu um erro na requisição.');
    }
    
    if (response.status === 204) {
        return;
    }
    
    return response.json();
}

export const api = {
    // ENDPOINTS DE PESSOAS
    
    // Busca todas as pessoas
    async getPeople(): Promise<Person[]> {
        const response = await fetch(`${BASE_URL}/person`);
        return handleResponse(response);
    },

    // Cadastra uma nova pessoa
    async createPerson(person: Person): Promise<Person> {
        const response = await fetch(`${BASE_URL}/person`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(person),
        });
        return handleResponse(response);
    },

    // Atualiza os dados de uma pessoa
    async updatePerson(id: number, person: Person): Promise<void> {
        const response = await fetch(`${BASE_URL}/person/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(person),
        });
        return handleResponse(response);
    },

    // Deleta uma pessoa com base no ID em cascata
    async deletePerson(id: number): Promise<void> {
        const response = await fetch(`${BASE_URL}/person/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    },

    //ENDPOINTS DE TRANSAÇOES

    // Busca todas as transações
    async getTransactions(): Promise<Transaction[]> {
        const response = await fetch(`${BASE_URL}/transaction`);
        return handleResponse(response);
    },

    // Cadastra uma nova transação valida se menor de 18 anos
    async createTransaction(transaction: Transaction): Promise<Transaction> {
        const response = await fetch(`${BASE_URL}/transaction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction),
        });
        return handleResponse(response);
    }
};
