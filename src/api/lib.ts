import axios from 'axios';
import { Transaction } from '../types';

export const API_ROOT = "https://fencer-commbank.azurewebsites.net"


export async function fetchTransactions(): Promise<Transaction[] | null> {
    try {
        const response = await axios.get(`${API_ROOT}/api/Transaction`);
        console.log(response.data)
        return response.data;

    } catch (error: any) {
        return null;
    }
}

export async function updateGoalIcon(goalId: string, icon: string): Promise<boolean> {
    try {
        const response = await axios.put(`${API_ROOT}/api/Goal/${goalId}/icon`, { "iconName": icon })
        console.log(response.data)
        return true
    } catch (error: any) {
        return false
    }
}