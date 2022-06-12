import axios from 'axios';
import { Goal, Transaction } from '../types';

export const API_ROOT = "https://fencer-commbank.azurewebsites.net"


export async function fetchTransactions(): Promise<Transaction[] | null> {
    try {
        const response = await axios.get(`${API_ROOT}/api/Transaction`);
        return response.data;

    } catch (error: any) {
        return null;
    }
}

export async function updateGoalIcon(goalId: string, icon: string): Promise<boolean> {
    try {
        await axios.put(`${API_ROOT}/api/Goal/${goalId}/icon`, { "iconName": icon })
        return true
    } catch (error: any) {
        return false
    }
}

export async function updateGoal(goalId: string, updatedGoal: Goal): Promise<boolean> {
    try {
        await axios.put(`${API_ROOT}/api/Goal/${goalId}`, updatedGoal)
        return true
    } catch (error: any) {
        return false
    }
}

export async function createGoal(): Promise<Goal | null> {
    try {
        const response = await axios.post(`${API_ROOT}/api/Goal/`, {})
        return response.data
    } catch (error: any) {
        return null
    }
}